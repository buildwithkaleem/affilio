
// "use client";

// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { motion } from "motion/react";

// import {
//   Search,
//   Users,
//   ShieldCheck,
//   UserRound,
//   Mail,
//   Pencil,
//   Trash2,
//   Loader2,
//   RefreshCw,
//   X,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

// export default function AdminUsersPage() {
//   const {
//     users,
//     loading,
//     error,
//     updating,
//     deleting,
//     fetchUsers,
//     updateUser,
//     deleteUser,
//   } = useAdminUsers();

//   const currentUser = useSelector(
//     (state) => state.auth.user
//   );

//   // =========================
//   // LOCAL STATE
//   // =========================

//   const [search, setSearch] = useState("");

//   const [editingUser, setEditingUser] =
//     useState(null);

//   const [deleteTarget, setDeleteTarget] =
//     useState(null);

//   const [actionError, setActionError] =
//     useState(null);

//   // =========================
//   // SEARCH
//   // =========================

//   const filteredUsers = useMemo(() => {
//     const query = search
//       .trim()
//       .toLowerCase();

//     if (!query) {
//       return users;
//     }

//     return users.filter((user) => {
//       const userName =
//         user.userName?.toLowerCase() || "";

//       const email =
//         user.email?.toLowerCase() || "";

//       const role =
//         user.role?.toLowerCase() || "";

//       return (
//         userName.includes(query) ||
//         email.includes(query) ||
//         role.includes(query)
//       );
//     });
//   }, [users, search]);

//   // =========================
//   // DELETE
//   // =========================

//   const handleDelete = async () => {
//     if (!deleteTarget) {
//       return;
//     }

//     try {
//       setActionError(null);

//       await deleteUser(
//         deleteTarget._id
//       );

//       setDeleteTarget(null);
//     } catch (error) {
//       setActionError(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to delete user"
//       );
//     }
//   };

//   // =========================
//   // UPDATE
//   // =========================

//   const handleUpdate = async (
//     userId,
//     userData
//   ) => {
//     try {
//       setActionError(null);

//       await updateUser(
//         userId,
//         userData
//       );

//       setEditingUser(null);
//     } catch (error) {
//       setActionError(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to update user"
//       );

//       throw error;
//     }
//   };

//   // =========================
//   // REFRESH
//   // =========================

//   const handleRefresh = async () => {
//     try {
//       setActionError(null);

//       await fetchUsers();
//     } catch (error) {
//       // Error already handled by hook
//     }
//   };

//   // =========================
//   // COUNTS
//   // =========================

//   const adminCount = users.filter(
//     (user) => user.role === "admin"
//   ).length;

//   const normalUserCount = users.filter(
//     (user) => user.role !== "admin"
//   ).length;

//   return (
//     <div className="space-y-6">

//       {/* =========================
//           HEADER
//       ========================= */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: -10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
//       >
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             Users
//           </h1>

//           <p className="mt-2 text-muted-foreground">
//             Manage registered users and administrator accounts.
//           </p>
//         </div>

//         <Button
//           type="button"
//           variant="outline"
//           onClick={handleRefresh}
//           disabled={loading}
//         >
//           {loading ? (
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           ) : (
//             <RefreshCw className="mr-2 h-4 w-4" />
//           )}

//           Refresh
//         </Button>
//       </motion.div>

//       {/* =========================
//           ERROR
//       ========================= */}

//       {(error || actionError) && (
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: -5,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
//         >
//           <div className="flex items-start justify-between gap-3">
//             <p>
//               {actionError || error}
//             </p>

//             {actionError && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   setActionError(null)
//                 }
//                 className="shrink-0"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//         </motion.div>
//       )}

//       {/* =========================
//           STATS
//       ========================= */}

//       <div className="grid gap-4 sm:grid-cols-3">

//         <UserStatCard
//           title="Total Users"
//           value={users.length}
//           icon={Users}
//         />

//         <UserStatCard
//           title="Administrators"
//           value={adminCount}
//           icon={ShieldCheck}
//         />

//         <UserStatCard
//           title="Regular Users"
//           value={normalUserCount}
//           icon={UserRound}
//         />

//       </div>

//       {/* =========================
//           USERS CARD
//       ========================= */}

//       <Card>

//         <CardContent className="p-0">

//           {/* =========================
//               SEARCH HEADER
//           ========================= */}

//           <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">

//             <div>
//               <h2 className="font-semibold">
//                 All Users
//               </h2>

//               <p className="text-sm text-muted-foreground">
//                 {filteredUsers.length} user
//                 {filteredUsers.length !== 1
//                   ? "s"
//                   : ""}{" "}
//                 found
//               </p>
//             </div>

//             <div className="relative w-full sm:max-w-sm">

//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(e.target.value)
//                 }
//                 placeholder="Search users..."
//                 className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//               />

//             </div>

//           </div>

//           {/* =========================
//               LOADING
//           ========================= */}

//           {loading ? (
//             <div className="flex min-h-64 items-center justify-center">
//               <div className="flex flex-col items-center gap-3 text-muted-foreground">

//                 <Loader2 className="h-7 w-7 animate-spin" />

//                 <p className="text-sm">
//                   Loading users...
//                 </p>

//               </div>
//             </div>

//           ) : filteredUsers.length === 0 ? (

//             /* =========================
//                EMPTY
//             ========================= */

//             <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center text-muted-foreground">

//               <Users className="h-12 w-12 opacity-30" />

//               <div>
//                 <p className="font-medium">
//                   {search
//                     ? "No users found"
//                     : "No users available"}
//                 </p>

//                 <p className="mt-1 text-sm">
//                   {search
//                     ? "Try a different search."
//                     : "There are no registered users yet."}
//                 </p>
//               </div>

//             </div>

//           ) : (

//             /* =========================
//                TABLE
//             ========================= */

//             <div className="overflow-x-auto">

//               <table className="w-full min-w-[760px]">

//                 <thead>
//                   <tr className="border-b bg-muted/40">

//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
//                       User
//                     </th>

//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
//                       Email
//                     </th>

//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
//                       Role
//                     </th>

//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
//                       Balance
//                     </th>

//                     <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
//                       Actions
//                     </th>

//                   </tr>
//                 </thead>

//                 <tbody>

//                   {filteredUsers.map(
//                     (user, index) => {

//                       const isCurrentUser =
//                         user._id ===
//                         (
//                           currentUser?._id ||
//                           currentUser?.id
//                         );

//                       return (
//                         <motion.tr
//                           key={user._id}
//                           initial={{
//                             opacity: 0,
//                             y: 5,
//                           }}
//                           animate={{
//                             opacity: 1,
//                             y: 0,
//                           }}
//                           transition={{
//                             delay:
//                               index * 0.03,
//                           }}
//                           className="border-b last:border-0 hover:bg-muted/30"
//                         >

//                           {/* USER */}

//                           <td className="px-4 py-4">

//                             <div className="flex items-center gap-3">

//                               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">

//                                 <UserRound className="h-5 w-5" />

//                               </div>

//                               <div className="min-w-0">

//                                 <p className="truncate font-medium">
//                                   {user.userName ||
//                                     "Unknown User"}
//                                 </p>

//                                 {isCurrentUser && (
//                                   <p className="text-xs text-primary">
//                                     You
//                                   </p>
//                                 )}

//                               </div>

//                             </div>

//                           </td>

//                           {/* EMAIL */}

//                           <td className="px-4 py-4">

//                             <div className="flex items-center gap-2 text-sm text-muted-foreground">

//                               <Mail className="h-4 w-4 shrink-0" />

//                               <span>
//                                 {user.email ||
//                                   "No email"}
//                               </span>

//                             </div>

//                           </td>

//                           {/* ROLE */}

//                           <td className="px-4 py-4">

//                             <RoleBadge
//                               role={user.role}
//                             />

//                           </td>

//                           {/* BALANCE */}

//                           <td className="px-4 py-4">

//                             <span className="font-medium">
//                               Rs.{" "}
//                               {Number(
//                                 user.balance || 0
//                               ).toLocaleString()}
//                             </span>

//                           </td>

//                           {/* ACTIONS */}

//                           <td className="px-4 py-4">

//                             <div className="flex justify-end gap-2">

//                               <Button
//                                 type="button"
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() =>
//                                   setEditingUser(
//                                     user
//                                   )
//                                 }
//                               >
//                                 <Pencil className="mr-2 h-4 w-4" />

//                                 Edit
//                               </Button>

//                               <Button
//                                 type="button"
//                                 variant="destructive"
//                                 size="sm"
//                                 disabled={
//                                   deleting ||
//                                   isCurrentUser
//                                 }
//                                 title={
//                                   isCurrentUser
//                                     ? "You cannot delete your own account"
//                                     : "Delete user"
//                                 }
//                                 onClick={() =>
//                                   setDeleteTarget(
//                                     user
//                                   )
//                                 }
//                               >
//                                 {deleting ? (
//                                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 ) : (
//                                   <Trash2 className="mr-2 h-4 w-4" />
//                                 )}

//                                 Delete
//                               </Button>

//                             </div>

//                           </td>

//                         </motion.tr>
//                       );
//                     }
//                   )}

//                 </tbody>

//               </table>

//             </div>
//           )}

//         </CardContent>

//       </Card>

//       {/* =========================
//           EDIT MODAL
//       ========================= */}

//       {editingUser && (
//         <EditUserModal
//           user={editingUser}
//           submitting={updating}
//           onClose={() =>
//             setEditingUser(null)
//           }
//           onSubmit={handleUpdate}
//         />
//       )}

//       {/* =========================
//           DELETE MODAL
//       ========================= */}

//       {deleteTarget && (
//         <DeleteUserModal
//           user={deleteTarget}
//           deleting={deleting}
//           onClose={() =>
//             setDeleteTarget(null)
//           }
//           onConfirm={handleDelete}
//         />
//       )}

//     </div>
//   );
// }


// /* =========================================================
//    STAT CARD
// ========================================================= */

// function UserStatCard({
//   title,
//   value,
//   icon: Icon,
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       whileHover={{
//         y: -3,
//       }}
//     >
//       <Card>

//         <CardContent className="flex items-center justify-between p-6">

//           <div>
//             <p className="text-sm text-muted-foreground">
//               {title}
//             </p>

//             <p className="mt-1 text-2xl font-bold">
//               {value}
//             </p>
//           </div>

//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
//             <Icon className="h-5 w-5" />
//           </div>

//         </CardContent>

//       </Card>
//     </motion.div>
//   );
// }


// /* =========================================================
//    ROLE BADGE
// ========================================================= */

// function RoleBadge({ role }) {
//   const isAdmin =
//     role === "admin";

//   return (
//     <span
//       className={`inline - flex items - center gap - 1.5 rounded - full px - 3 py - 1 text - xs font - medium ${
//   isAdmin
//     ? "bg-primary/10 text-primary"
//     : "bg-muted text-muted-foreground"
// } `}
//     >
//       {isAdmin ? (
//         <ShieldCheck className="h-3.5 w-3.5" />
//       ) : (
//         <UserRound className="h-3.5 w-3.5" />
//       )}

//       {isAdmin
//         ? "Admin"
//         : "User"}
//     </span>
//   );
// }


// /* =========================================================
//    EDIT USER MODAL
// ========================================================= */

// function EditUserModal({
//   user,
//   submitting,
//   onClose,
//   onSubmit,
// }) {
//   const [userName, setUserName] =
//     useState(user.userName || "");

//   const [email, setEmail] =
//     useState(user.email || "");

//   const [role, setRole] =
//     useState(user.role || "user");

//   const [newPassword, setNewPassword] =
//     useState("");

//   const [localError, setLocalError] =
//     useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLocalError("");

//     if (!userName.trim()) {
//       setLocalError(
//         "Username is required."
//       );
//       return;
//     }

//     if (!email.trim()) {
//       setLocalError(
//         "Email is required."
//       );
//       return;
//     }

//     const userData = {
//       userName: userName.trim(),
//       email: email.trim(),
//       role,
//     };

//     /*
//      * Password sirf tab send karo
//      * jab admin actually password change
//      * karna chahta ho.
//      */

//     if (newPassword.trim()) {
//       userData.newPassword =
//         newPassword.trim();
//     }

//     try {
//       await onSubmit(
//         user._id,
//         userData
//       );
//     } catch (error) {
//       setLocalError(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to update user"
//       );
//     }
//   };

//   return (
//     <ModalOverlay>

//       <div className="w-full max-w-lg rounded-xl border bg-background p-6 shadow-xl">

//         {/* HEADER */}

//         <div className="mb-6 flex items-start justify-between gap-4">

//           <div>
//             <h2 className="text-xl font-semibold">
//               Edit User
//             </h2>

//             <p className="mt-1 text-sm text-muted-foreground">
//               Update user account information.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             disabled={submitting}
//             className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
//           >
//             <X className="h-5 w-5" />
//           </button>

//         </div>

//         {/* ERROR */}

//         {localError && (
//           <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
//             {localError}
//           </div>
//         )}

//         {/* FORM */}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//         >

//           {/* USERNAME */}

//           <div className="space-y-2">

//             <label
//               htmlFor="edit-user-name"
//               className="text-sm font-medium"
//             >
//               Username
//             </label>

//             <input
//               id="edit-user-name"
//               type="text"
//               value={userName}
//               onChange={(e) =>
//                 setUserName(
//                   e.target.value
//                 )
//               }
//               disabled={submitting}
//               className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//             />

//           </div>

//           {/* EMAIL */}

//           <div className="space-y-2">

//             <label
//               htmlFor="edit-user-email"
//               className="text-sm font-medium"
//             >
//               Email
//             </label>

//             <input
//               id="edit-user-email"
//               type="email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(
//                   e.target.value
//                 )
//               }
//               disabled={submitting}
//               className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//             />

//           </div>

//           {/* ROLE */}

//           <div className="space-y-2">

//             <label
//               htmlFor="edit-user-role"
//               className="text-sm font-medium"
//             >
//               Role
//             </label>

//             <select
//               id="edit-user-role"
//               value={role}
//               onChange={(e) =>
//                 setRole(
//                   e.target.value
//                 )
//               }
//               disabled={submitting}
//               className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//             >
//               <option value="user">
//                 User
//               </option>

//               <option value="admin">
//                 Admin
//               </option>
//             </select>

//           </div>

//           {/* PASSWORD */}

//           <div className="space-y-2">

//             <label
//               htmlFor="edit-user-password"
//               className="text-sm font-medium"
//             >
//               New Password
//               <span className="ml-1 text-xs font-normal text-muted-foreground">
//                 (optional)
//               </span>
//             </label>

//             <input
//               id="edit-user-password"
//               type="password"
//               value={newPassword}
//               onChange={(e) =>
//                 setNewPassword(
//                   e.target.value
//                 )
//               }
//               disabled={submitting}
//               placeholder="Leave empty to keep current password"
//               className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//             />

//           </div>

//           {/* BUTTONS */}

//           <div className="flex flex-col-reverse gap-2 pt-3 sm:flex-row sm:justify-end">

//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               disabled={submitting}
//             >
//               Cancel
//             </Button>

//             <Button
//               type="submit"
//               disabled={submitting}
//             >
//               {submitting && (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               )}

//               {submitting
//                 ? "Updating..."
//                 : "Update User"}
//             </Button>

//           </div>

//         </form>

//       </div>

//     </ModalOverlay>
//   );
// }


// /* =========================================================
//    DELETE USER MODAL
// ========================================================= */

// function DeleteUserModal({
//   user,
//   deleting,
//   onClose,
//   onConfirm,
// }) {
//   return (
//     <ModalOverlay>

//       <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">

//         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
//           <Trash2 className="h-6 w-6" />
//         </div>

//         <h2 className="mt-4 text-xl font-semibold">
//           Delete User?
//         </h2>

//         <p className="mt-2 text-sm leading-6 text-muted-foreground">
//           Are you sure you want to delete{" "}
//           <span className="font-medium text-foreground">
//             {user.userName}
//           </span>
//           ? This action cannot be undone.
//         </p>

//         <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

//           <Button
//             type="button"
//             variant="outline"
//             onClick={onClose}
//             disabled={deleting}
//           >
//             Cancel
//           </Button>

//           <Button
//             type="button"
//             variant="destructive"
//             onClick={onConfirm}
//             disabled={deleting}
//           >
//             {deleting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete User
//               </>
//             )}
//           </Button>

//         </div>

//       </div>

//     </ModalOverlay>
//   );
// }


// /* =========================================================
//    MODAL OVERLAY
// ========================================================= */

// function ModalOverlay({
//   children,
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//       {children}
//     </div>
//   );
// }






// v2
// "use client";

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { motion } from "motion/react";

// import {
//   Users,
//   UserCheck,
//   UserX,
//   ShieldCheck,
//   Trash2,
//   Loader2,
//   Mail,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

// export default function AdminUsersPage() {
//   // =========================
//   // REDUX
//   // =========================

//   const {
//     users = [],
//     loading,
//     error,
//   } = useSelector(
//     (state) => state.adminUsers
//   );

//   // =========================
//   // HOOK
//   // =========================

//   const {
//     deleteUser,
//   } = useAdminUsers();

//   // =========================
//   // LOCAL STATE
//   // =========================

//   const [deletingId, setDeletingId] =
//     useState(null);

//   // =========================
//   // DELETE USER
//   // =========================

//   const handleDelete = async (userId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this user?"
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingId(userId);

//       await deleteUser(userId);
//     } catch (error) {
//       console.error(
//         "Delete user error:",
//         error
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // =========================
//   // STATS
//   // =========================

//   const totalUsers = users.length;

//   const adminUsers = users.filter(
//     (user) => user.role === "admin"
//   ).length;

//   const normalUsers = users.filter(
//     (user) => user.role !== "admin"
//   ).length;

//   // =========================
//   // RENDER
//   // =========================

//   return (
//     <div className="space-y-6">

//       {/* =========================
//           HEADER
//       ========================= */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: -10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <h1 className="text-3xl font-bold tracking-tight">
//           Users
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Manage all users registered on your platform.
//         </p>
//       </motion.div>

//       {/* =========================
//           ERROR
//       ========================= */}

//       {error && (
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
//         >
//           {error}
//         </motion.div>
//       )}

//       {/* =========================
//           STATS
//       ========================= */}

//       <div className="grid gap-4 sm:grid-cols-3">

//         {/* TOTAL */}

//         <StatCard
//           title="Total Users"
//           value={totalUsers}
//           icon={Users}
//         />

//         {/* NORMAL USERS */}

//         <StatCard
//           title="Users"
//           value={normalUsers}
//           icon={UserCheck}
//         />

//         {/* ADMINS */}

//         <StatCard
//           title="Admins"
//           value={adminUsers}
//           icon={ShieldCheck}
//         />

//       </div>

//       {/* =========================
//           USERS TABLE
//       ========================= */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <Card>

//           <CardHeader>
//             <div className="flex items-center gap-2">

//               <Users className="h-5 w-5" />

//               <CardTitle>
//                 All Users
//               </CardTitle>

//             </div>
//           </CardHeader>

//           <CardContent>

//             {/* =========================
//                 LOADING
//             ========================= */}

//             {loading ? (
//               <div className="flex min-h-48 items-center justify-center">

//                 <Loader2 className="h-6 w-6 animate-spin" />

//               </div>
//             ) : users.length === 0 ? (

//               /* =========================
//                  EMPTY
//               ========================= */

//               <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground">

//                 <UserX className="h-10 w-10 opacity-40" />

//                 <p className="text-sm">
//                   No users found.
//                 </p>

//               </div>
//             ) : (

//               /* =========================
//                  TABLE
//               ========================= */

//               <div className="overflow-x-auto">

//                 <table className="w-full min-w-[700px]">

//                   <thead>
//                     <tr className="border-b">

//                       <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
//                         User
//                       </th>

//                       <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
//                         Email
//                       </th>

//                       <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
//                         Role
//                       </th>

//                       <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
//                         Balance
//                       </th>

//                       <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
//                         Action
//                       </th>

//                     </tr>
//                   </thead>

//                   <tbody>

//                     {users.map(
//                       (user, index) => {

//                         const isDeleting =
//                           deletingId === user._id;

//                         return (
//                           <motion.tr
//                             key={user._id}
//                             initial={{
//                               opacity: 0,
//                               y: 5,
//                             }}
//                             animate={{
//                               opacity: 1,
//                               y: 0,
//                             }}
//                             transition={{
//                               delay:
//                                 index * 0.03,
//                             }}
//                             className="border-b last:border-0"
//                           >

//                             {/* USER */}

//                             <td className="px-4 py-4">

//                               <div className="flex items-center gap-3">

//                                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">

//                                   <Users className="h-5 w-5" />

//                                 </div>

//                                 <div>

//                                   <p className="font-medium">
//                                     {user.userName ||
//                                       "Unknown User"}
//                                   </p>

//                                   <p className="text-xs text-muted-foreground">
//                                     ID:{" "}
//                                     {user._id}
//                                   </p>

//                                 </div>

//                               </div>

//                             </td>

//                             {/* EMAIL */}

//                             <td className="px-4 py-4">

//                               <div className="flex items-center gap-2 text-sm">

//                                 <Mail className="h-4 w-4 text-muted-foreground" />

//                                 <span>
//                                   {user.email ||
//                                     "No email"}
//                                 </span>

//                               </div>

//                             </td>

//                             {/* ROLE */}

//                             <td className="px-4 py-4">

//                               {user.role ===
//                                 "admin" ? (
//                                 <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">

//                                   <ShieldCheck className="h-3.5 w-3.5" />

//                                   Admin

//                                 </span>
//                               ) : (
//                                 <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium">

//                                   <UserCheck className="h-3.5 w-3.5" />

//                                   User

//                                 </span>
//                               )}

//                             </td>

//                             {/* BALANCE */}

//                             <td className="px-4 py-4">

//                               <span className="font-semibold">
//                                 Rs.{" "}
//                                 {Number(
//                                   user.balance ||
//                                   0
//                                 ).toLocaleString()}
//                               </span>

//                             </td>

//                             {/* DELETE */}

//                             <td className="px-4 py-4 text-right">

//                               <Button
//                                 type="button"
//                                 variant="destructive"
//                                 size="sm"
//                                 disabled={
//                                   isDeleting
//                                 }
//                                 onClick={() =>
//                                   handleDelete(
//                                     user._id
//                                   )
//                                 }
//                               >

//                                 {isDeleting ? (
//                                   <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />

//                                     Deleting...
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Trash2 className="mr-2 h-4 w-4" />

//                                     Delete
//                                   </>
//                                 )}

//                               </Button>

//                             </td>

//                           </motion.tr>
//                         );
//                       }
//                     )}

//                   </tbody>

//                 </table>

//               </div>
//             )}

//           </CardContent>

//         </Card>
//       </motion.div>

//     </div>
//   );
// }


// /* =============================
//    STAT CARD
// ============================= */

// function StatCard({
//   title,
//   value,
//   icon: Icon,
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       whileHover={{
//         y: -3,
//       }}
//     >
//       <Card>

//         <CardContent className="flex items-center justify-between p-6">

//           <div>

//             <p className="text-sm text-muted-foreground">
//               {title}
//             </p>

//             <p className="mt-1 text-2xl font-bold">
//               {value}
//             </p>

//           </div>

//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

//             <Icon className="h-5 w-5" />

//           </div>

//         </CardContent>

//       </Card>
//     </motion.div>
//   );
// }




// v3
"use client";

import { motion } from "motion/react";

import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  Trash2,
  Loader2,
  Mail,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

export default function AdminUsersPage() {
  // =========================
  // ADMIN USERS HOOK
  // =========================

  const {
    users = [],
    loading,
    error,
    deletingId,
    deleteUser,
  } = useAdminUsers();

  // =========================
  // DELETE USER
  // =========================

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(userId);
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );
    }
  };

  // =========================
  // STATS
  // =========================

  const totalUsers = users.length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  const normalUsers = users.filter(
    (user) => user.role !== "admin"
  ).length;

  // =========================
  // RENDER
  // =========================

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Users
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage all users registered on your platform.
        </p>
      </motion.div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error}
        </motion.div>
      )}

      {/* =========================
          STATS
      ========================= */}

      <div className="grid gap-4 sm:grid-cols-3">

        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
        />

        <StatCard
          title="Users"
          value={normalUsers}
          icon={UserCheck}
        />

        <StatCard
          title="Admins"
          value={adminUsers}
          icon={ShieldCheck}
        />

      </div>

      {/* =========================
          USERS TABLE
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <Card>

          <CardHeader>
            <div className="flex items-center gap-2">

              <Users className="h-5 w-5" />

              <CardTitle>
                All Users
              </CardTitle>

            </div>
          </CardHeader>

          <CardContent>

            {/* =========================
                LOADING
            ========================= */}

            {loading ? (
              <div className="flex min-h-48 items-center justify-center">

                <Loader2 className="h-6 w-6 animate-spin" />

              </div>
            ) : users.length === 0 ? (

              /* =========================
                 EMPTY
              ========================= */

              <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground">

                <UserX className="h-10 w-10 opacity-40" />

                <p className="text-sm">
                  No users found.
                </p>

              </div>

            ) : (

              /* =========================
                 TABLE
              ========================= */

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px]">

                  <thead>
                    <tr className="border-b">

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        User
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Email
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Role
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Balance
                      </th>

                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {users.map(
                      (user, index) => {

                        const isDeleting =
                          deletingId === user._id;

                        return (
                          <motion.tr
                            key={user._id}
                            initial={{
                              opacity: 0,
                              y: 5,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay:
                                index * 0.03,
                            }}
                            className="border-b last:border-0"
                          >

                            {/* USER */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">

                                  <Users className="h-5 w-5" />

                                </div>

                                <div>

                                  <p className="font-medium">
                                    {user.userName ||
                                      "Unknown User"}
                                  </p>

                                  <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                                    ID:{" "}
                                    {user._id}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* EMAIL */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-2 text-sm">

                                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />

                                <span className="max-w-[220px] truncate">
                                  {user.email ||
                                    "No email"}
                                </span>

                              </div>

                            </td>

                            {/* ROLE */}

                            <td className="px-4 py-4">

                              {user.role ===
                                "admin" ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">

                                  <ShieldCheck className="h-3.5 w-3.5" />

                                  Admin

                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium">

                                  <UserCheck className="h-3.5 w-3.5" />

                                  User

                                </span>
                              )}

                            </td>

                            {/* BALANCE */}

                            <td className="px-4 py-4">

                              <span className="font-semibold">
                                Rs.{" "}
                                {Number(
                                  user.balance || 0
                                ).toLocaleString()}
                              </span>

                            </td>

                            {/* DELETE */}

                            <td className="px-4 py-4 text-right">

                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDelete(
                                    user._id
                                  )
                                }
                              >

                                {isDeleting ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="mr-2 h-4 w-4" />

                                    Delete
                                  </>
                                )}

                              </Button>

                            </td>

                          </motion.tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </CardContent>

        </Card>
      </motion.div>

    </div>
  );
}


/* =============================
   STAT CARD
============================= */

function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -3,
      }}
    >
      <Card>

        <CardContent className="flex items-center justify-between p-6">

          <div>

            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <p className="mt-1 text-2xl font-bold">
              {value}
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

            <Icon className="h-5 w-5" />

          </div>

        </CardContent>

      </Card>
    </motion.div>
  );
}