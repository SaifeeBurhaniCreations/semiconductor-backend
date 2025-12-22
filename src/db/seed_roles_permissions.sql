-- Roles
INSERT INTO roles (name, level) VALUES
  ('admin', 10),
  ('manager', 5),
  ('employee', 1)
ON CONFLICT DO NOTHING;

-- Permissions
INSERT INTO permissions (code) VALUES
  ('EMPLOYEE_READ'),
  ('EMPLOYEE_CREATE'),
  ('EMPLOYEE_UPDATE'),
  ('EMPLOYEE_DELETE'),
  ('ROLE_MANAGE')
ON CONFLICT DO NOTHING;

-- Admin gets everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin'
ON CONFLICT DO NOTHING;

-- Manager gets limited power
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN ('EMPLOYEE_READ','EMPLOYEE_CREATE','EMPLOYEE_UPDATE')
WHERE r.name = 'manager'
ON CONFLICT DO NOTHING;

-- Employee is read-only
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code = 'EMPLOYEE_READ'
WHERE r.name = 'employee'
ON CONFLICT DO NOTHING;
