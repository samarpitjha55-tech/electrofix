/*
  # Seed initial data for electrical services business

  1. Add service categories
  2. Add sample services with pricing
  3. Add sample team members information

  This migration populates the database with realistic data for demonstration purposes.
*/

-- Insert service categories if they don't exist
INSERT INTO service_categories (id, name, description, icon) VALUES
  (gen_random_uuid(), 'Installation', 'Electrical installation services', '⚡'),
  (gen_random_uuid(), 'Maintenance', 'Regular maintenance and inspections', '🔧'),
  (gen_random_uuid(), 'Repair', 'Emergency repairs and fixes', '🛠️'),
  (gen_random_uuid(), 'Safety', 'Safety audits and certifications', '🛡️')
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO services (id, name, description, category_id, price_min, price_max, duration_hours, is_available, image_url) VALUES
  (gen_random_uuid(), 'Home Electrical Wiring', 'Complete electrical wiring installation for new homes', 
   (SELECT id FROM service_categories WHERE name = 'Installation'), 500, 1500, 8, true, NULL),
  
  (gen_random_uuid(), 'Outlet & Switch Installation', 'Install new electrical outlets and switches', 
   (SELECT id FROM service_categories WHERE name = 'Installation'), 150, 300, 2, true, NULL),
  
  (gen_random_uuid(), 'Circuit Breaker Upgrade', 'Upgrade or replace circuit breaker panels', 
   (SELECT id FROM service_categories WHERE name = 'Installation'), 400, 800, 4, true, NULL),
  
  (gen_random_uuid(), 'Annual Safety Inspection', 'Complete electrical system safety inspection', 
   (SELECT id FROM service_categories WHERE name = 'Safety'), 100, 200, 2, true, NULL),
  
  (gen_random_uuid(), 'Preventive Maintenance', 'Regular maintenance to prevent issues', 
   (SELECT id FROM service_categories WHERE name = 'Maintenance'), 200, 350, 3, true, NULL),
  
  (gen_random_uuid(), 'Emergency Electrical Repair', '24/7 emergency repair service', 
   (SELECT id FROM service_categories WHERE name = 'Repair'), 250, 500, 1, true, NULL),
  
  (gen_random_uuid(), 'Lighting Design & Installation', 'Custom lighting solutions for any space', 
   (SELECT id FROM service_categories WHERE name = 'Installation'), 300, 1000, 4, true, NULL),
  
  (gen_random_uuid(), 'Generator Installation', 'Install backup power generators', 
   (SELECT id FROM service_categories WHERE name = 'Installation'), 800, 2000, 6, true, NULL)
ON CONFLICT DO NOTHING;
