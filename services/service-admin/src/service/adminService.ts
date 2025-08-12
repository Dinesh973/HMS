import Admin from "../models/adminModel";
import bcrypt from "bcrypt";



// Dashboard: Get system stats
export async function getDashboardStats() {
  // These would normally come from other microservices via API calls
  // For now, we'll return mock data so you can test your front end
  return {
    totalPatients: 120,
    totalDoctors: 25,
    totalNurses: 40,
    appointmentsToday: 15,
    monthlyRevenue: 55000
  };
}

// Dashboard: Get latest reports or activity logs
export async function getLatestReports() {
  return [
    { id: 1, type: "system", message: "Doctor John added a new patient", timestamp: new Date() },
    { id: 2, type: "finance", message: "Monthly subscription payment received", timestamp: new Date() }
  ];
}

// Dashboard: Get upcoming appointments overview
export async function getAppointmentsOverview() {
  return [
    { id: 101, patient: "Alice", doctor: "Dr. Smith", time: new Date(Date.now() + 3600 * 1000) },
    { id: 102, patient: "Bob", doctor: "Dr. Lee", time: new Date(Date.now() + 7200 * 1000) }
  ];
}

// Dashboard: User account summary
export async function getUserManagementSummary() {
  return {
    patients: { active: 100, inactive: 5 },
    doctors: { active: 20, inactive: 2 },
    nurses: { active: 35, inactive: 3 }
  };
}




export async function createAdmin(data: {
  username: string;
  email: string;
  password: string;
  profilePic?: string | null;
  role: "superadmin" | "admin";
}) {
  const existing = await Admin.findOne({ where: { email: data.email } });
  if (existing) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(data.password, 10);
  const admin = await Admin.create({ ...data, password: hashed });
  return admin;
}

export async function authenticateAdmin(email: string, password: string) {
  const admin = await Admin.findOne({ where: { email} });
  console.log("DB fetched admin:", admin); 
  if (!admin) return console.log("Authentication failed for:", email);
  else console.log("Admin found:", admin.email);

  const valid = await bcrypt.compare(password, admin.password);
  console.log("Password valid:", valid);
  if (!valid) return console.log("Password Invalid:", email);
    else console.log("Authentication successful for:", email);

  return admin; // includes role now
}

export async function getAdminById(id: number) {
  return await Admin.findByPk(id, {
    attributes: ["id", "username", "email", "profilePic", "role"],
  });
}

export async function getAllAdmins() {
  return await Admin.findAll({
    attributes: ["id", "username", "email", "profilePic", "role"],
  });
}


export async function updateAdmin(id: number, updateData: Partial<{ username: string; email: string; password: string; profilePic?: string | null; }>) {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  const [updated] = await Admin.update(updateData, { where: { id } });
  if (!updated) throw new Error("Admin not found");
  return getAdminById(id);
}

export async function deleteAdmin(id: number) {
  const deleted = await Admin.destroy({ where: { id } });
  if (!deleted) throw new Error("Admin not found");
}