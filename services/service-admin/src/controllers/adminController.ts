import { Request, Response } from "express";
import * as adminService from "../service/adminService";
import { signJwt } from "../utils/jwt.util";

import { AuthRequest } from "../middlewares/authMiddleware";





//fetching Dashboard
export async function getDashboardStats(req: AuthRequest, res: Response) {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
}

export async function getLatestReports(req: AuthRequest, res: Response) {
  try {
    const reports = await adminService.getLatestReports();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching latest reports" });
  }
}

export async function getAppointmentsOverview(req: AuthRequest, res: Response) {
  try {
    const appointments = await adminService.getAppointmentsOverview();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
}

export async function getUserManagementSummary(req: AuthRequest, res: Response) {
  try {
    const summary = await adminService.getUserManagementSummary();
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user summary" });
  }
}




export async function register(req: Request, res: Response) {
  try {
    const { username, email, password, } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const profilePic = req.file?.filename ?? null;

    // ✅ Check how many admins are in the DB
    const existingAdmins = await adminService.getAllAdmins();
    const role = existingAdmins.length === 0 ? "superadmin" : "admin";

    const admin = await adminService.createAdmin({
      username,
      email,
      password,
      profilePic,
       role // pass the role
    });

    res.status(201).json({
      message: `Admin registered as ${role}`,
      adminId: admin.id
    });
  } catch (error: any) {
    if (error.message === "Email already in use")
      return res.status(409).json({ message: error.message });
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
}


export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", email, password);

    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const admin = await adminService.authenticateAdmin(email, password);
    if (!admin) {
      console.log("Authentication failed for:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Use actual role from DB in JWT
    const token = signJwt({ id: admin.id, role: admin.role });

    res.json({
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        profilePic: admin.profilePic,
        role: admin.role,  // send role back to frontend
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
}

export async function getProfile(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const admin = await adminService.getAdminById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
}

export async function getAllAdmins(req: AuthRequest, res: Response) {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching admins" });
  }
}

export async function updateAdmin(req: AuthRequest, res: Response) {
  try {
    const adminId = Number(req.params.id);
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (req.user.id !== adminId && req.user.role !== "superadmin")
      return res.status(403).json({ message: "Forbidden" });

    const updateData: Partial<{ username: string; email: string; password: string; profilePic?: string }> = req.body;
    if (req.file) updateData.profilePic = req.file.filename;

    const updatedAdmin = await adminService.updateAdmin(adminId, updateData);
    res.json(updatedAdmin);
  } catch (error: any) {
    if (error.message === "Admin not found") return res.status(404).json({ message: error.message });
    console.error(error);
    res.status(500).json({ message: "Server error updating admin" });
  }
}

export async function deleteAdmin(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== "superadmin")
      return res.status(403).json({ message: "Forbidden" });

    const adminId = Number(req.params.id);
    await adminService.deleteAdmin(adminId);
    res.json({ message: "Admin deleted" });
  } catch (error: any) {
    if (error.message === "Admin not found") return res.status(404).json({ message: error.message });
    console.error(error);
    res.status(500).json({ message: "Server error deleting admin" });
  }
}
