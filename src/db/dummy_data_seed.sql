INSERT INTO roles (name, level)
VALUES ('admin', 10), ('employee', 1);

INSERT INTO permissions (code)
VALUES ('EMPLOYEE_READ'), ('EMPLOYEE_CREATE');

INSERT INTO role_permissions (role_id, permission_id)
VALUES (1, 1), (1, 2);
