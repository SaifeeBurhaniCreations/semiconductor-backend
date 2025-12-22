import { Hono } from "hono";
import { requirePermission } from "../auth/permissions";
import { mongoDb } from "../db/mongo";

type AuthUser = {
  sub: string;
  permissions: string[];
};

export const employeesRoute = new Hono();

/**
 * GET /employees
 * Requires: EMPLOYEE_READ
 */
employeesRoute.get(
  "/",
  requirePermission("EMPLOYEE_READ"),
  async (c) => {
    const user = c.get("user") as AuthUser;

    try {
      /**
       * =====================================================
       * 🔹 BUSINESS LOGIC START
       * Fetch employees from your primary data store
       * (PostgreSQL / MongoDB / external service)
       * =====================================================
       */

      const employees: any[] = []; // ← replace with real data fetch

    //   BUSINESS LOGIC END

      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_READ",
        resource: "employees",
        success: true,
        timestamp: new Date(),
      });

      return c.json({ employees }, 200);
    } catch (err) {
      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_READ",
        resource: "employees",
        success: false,
        error: String(err),
        timestamp: new Date(),
      });

      return c.json({ error: "Failed to fetch employees" }, 500);
    }
  }
);

/**
 * POST /employees
 * Requires: EMPLOYEE_CREATE
 */
employeesRoute.post(
  "/",
  requirePermission("EMPLOYEE_CREATE"),
  async (c) => {
    const user = c.get("user") as AuthUser;

    try {
      const body = await c.req.json();

      /**
       * =====================================================
       * 🔹 BUSINESS LOGIC START
       * Validate input & create employee
       * =====================================================
       */

      // Example validation placeholder
      if (!body?.name || !body?.email) {
        return c.json({ error: "Invalid payload" }, 400);
      }

      const createdEmployee = {
        id: crypto.randomUUID(),
        name: body.name,
        email: body.email,
      };

      /**
       * =====================================================
       * 🔹 BUSINESS LOGIC END
       * =====================================================
       */

      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_CREATE",
        resource: "employee",
        targetId: createdEmployee.id,
        success: true,
        timestamp: new Date(),
      });

      return c.json({ employee: createdEmployee }, 201);
    } catch (err) {
      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_CREATE",
        resource: "employee",
        success: false,
        error: String(err),
        timestamp: new Date(),
      });

      return c.json({ error: "Failed to create employee" }, 500);
    }
  }
);

/**
 * PUT /employees/:id
 * Requires: EMPLOYEE_UPDATE
 */
employeesRoute.put(
  "/:id",
  requirePermission("EMPLOYEE_UPDATE"),
  async (c) => {
    const user = c.get("user") as AuthUser;
    const id = c.req.param("id");

    try {
      const body = await c.req.json();

      /**
       * =====================================================
       * 🔹 BUSINESS LOGIC START
       * Update employee by ID
       * =====================================================
       */

      const updatedEmployee = {
        id,
        ...body,
      };

      /**
       * =====================================================
       * 🔹 BUSINESS LOGIC END
       * =====================================================
       */

      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_UPDATE",
        resource: "employee",
        targetId: id,
        success: true,
        timestamp: new Date(),
      });

      return c.json({ employee: updatedEmployee }, 200);
    } catch (err) {
      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_UPDATE",
        resource: "employee",
        targetId: id,
        success: false,
        error: String(err),
        timestamp: new Date(),
      });

      return c.json({ error: "Failed to update employee" }, 500);
    }
  }
);

/**
 * DELETE /employees/:id
 * Requires: EMPLOYEE_DELETE
 */
employeesRoute.delete(
  "/:id",
  requirePermission("EMPLOYEE_DELETE"),
  async (c) => {
    const user = c.get("user") as AuthUser;
    const id = c.req.param("id");

    try {
      /**
       * =====================================================
       * 🔹 BUSINESS LOGIC START
       * Delete employee by ID
       * =====================================================
       */

      const deleted = true; // ← replace with real deletion result

      /**
       * =====================================================
       * 🔹 BUSINESS LOGIC END
       * =====================================================
       */

      if (!deleted) {
        return c.json({ error: "Employee not found" }, 404);
      }

      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_DELETE",
        resource: "employee",
        targetId: id,
        success: true,
        timestamp: new Date(),
      });

      return c.json({ success: true }, 200);
    } catch (err) {
      await mongoDb.collection("access_logs").insertOne({
        userId: user.sub,
        action: "EMPLOYEE_DELETE",
        resource: "employee",
        targetId: id,
        success: false,
        error: String(err),
        timestamp: new Date(),
      });

      return c.json({ error: "Failed to delete employee" }, 500);
    }
  }
);
