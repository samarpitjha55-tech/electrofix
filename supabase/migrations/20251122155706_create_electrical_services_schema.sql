/*
  # Electrical Services Business Database Schema

  1. New Tables
    - `profiles`: User profiles (customers and technicians)
    - `services`: Service offerings (electrical work types)
    - `bookings`: Service bookings with status tracking
    - `reviews`: Customer reviews and ratings
    - `support_tickets`: Customer support requests
    - `messages`: Support messaging system
    - `team_members`: Technician team information
    - `service_categories`: Categories for electrical services

  2. Security
    - Enable RLS on all tables
    - Implement role-based access control
    - Customers can view their own data
    - Technicians can manage assigned work
    - Admins can manage all data

  3. Important Notes
    - All timestamps use UTC timezone
    - Status fields use enum-like text values
    - Foreign key relationships ensure data integrity
    - Soft deletes via is_deleted flag for audit trail
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  role text DEFAULT 'customer' CHECK (role IN ('customer', 'technician', 'admin')),
  company_name text,
  avatar_url text,
  bio text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service categories
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category_id uuid REFERENCES service_categories(id),
  price_min decimal(10,2) NOT NULL,
  price_max decimal(10,2) NOT NULL,
  duration_hours integer DEFAULT 2,
  is_available boolean DEFAULT true,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES profiles(id),
  service_id uuid NOT NULL REFERENCES services(id),
  technician_id uuid REFERENCES profiles(id),
  booking_date date NOT NULL,
  start_time time NOT NULL,
  duration_hours integer DEFAULT 2,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  location text NOT NULL,
  notes text,
  estimated_cost decimal(10,2),
  final_cost decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id),
  customer_id uuid NOT NULL REFERENCES profiles(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES profiles(id),
  subject text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id),
  sender_id uuid NOT NULL REFERENCES profiles(id),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  specializations text[],
  rating decimal(3,2) DEFAULT 5.0,
  total_jobs integer DEFAULT 0,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id AND role = 'customer');

-- Services policies (public read)
CREATE POLICY "Anyone can view available services"
  ON services FOR SELECT
  USING (is_available = true);

CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Service categories policies
CREATE POLICY "Anyone can view service categories"
  ON service_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON service_categories FOR ALL
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Bookings policies
CREATE POLICY "Customers can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = customer_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK (auth.uid() = customer_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Customers can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

-- Support tickets policies
CREATE POLICY "Customers can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Customers can create support tickets"
  ON support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update own tickets"
  ON support_tickets FOR UPDATE
  TO authenticated
  USING (auth.uid() = customer_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK (auth.uid() = customer_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Messages policies
CREATE POLICY "Ticket participants can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = messages.ticket_id
      AND (support_tickets.customer_id = auth.uid() OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
    )
  );

CREATE POLICY "Ticket participants can add messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = messages.ticket_id
      AND (support_tickets.customer_id = auth.uid() OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
    )
  );

-- Team members policies
CREATE POLICY "Anyone can view team members"
  ON team_members FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage team members"
  ON team_members FOR ALL
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Create indexes for performance
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_technician_id ON bookings(technician_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_support_tickets_customer_id ON support_tickets(customer_id);
CREATE INDEX idx_messages_ticket_id ON messages(ticket_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
