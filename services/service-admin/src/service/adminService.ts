import Admin from "../models/adminModel";
import bcrypt from "bcrypt";

export async function createAdmin(data: {
  username: string;
  email: string;
  password: string;
  profilePic?: string | null;
}) {
  const existing = await Admin.findOne({ where: { email: data.email } });
  if (existing) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(data.password, 10);
  const admin = await Admin.create({ ...data, password: hashed });
  return admin;
}

export async function authenticateAdmin(email: string, password: string) {
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return null;

  return admin;
}

export async function getAdminById(id: number) {
  return await Admin.findByPk(id, { attributes: ["id", "username", "email", "profilePic"] });
}

export async function getAllAdmins() {
  return await Admin.findAll({ attributes: ["id", "username", "email", "profilePic"] });
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
