'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '../../libs/auth';
import AdminForm from "../../component/AdminForm";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProfileImg from "../../../assets/img/P.jpg";
import Image from "next/image";
import Link from "next/link";
import { Home, Search, Users2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

// Define a type for the Admin object
interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
}

const SuperAdminDashboard: React.FC = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null); // Use the Admin type for selectedAdmin

  useEffect(() => {
    const role = Auth.getRole();

    // Uncomment this block for role-based redirection
    // if (role !== 'Super Admin') {
    //   router.push('/login');
    // }
  }, [router]);

  const admins: Admin[] = [
    {
      id: 1,
      name: "Pramod Chhetri",
      email: "pramod@example.com",
      password: "123456",
      role: "Admin",
      status: "Online",
      createdAt: "2023-07-12 10:42 AM",
    },
    {
      id: 2,
      name: "Mahendra Adk",
      email: "mahendra@example.com",
      password: "654321",
      role: "Admin",
      status: "Online",
      createdAt: "2023-10-18 03:21 PM",
    },
    {
      id: 3,
      name: "Krishna T",
      email: "krishna@example.com",
      password: "abcdef",
      role: "Admin",
      status: "Online",
      createdAt: "2023-11-29 08:15 AM",
    },
  ];

  const openDialogForAdd = () => {
    setSelectedAdmin(null);
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (admin: Admin) => {
    setSelectedAdmin(admin); // Use the Admin type here
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedAdmin(null);
    setIsDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/dashboard/super-admin"
              className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground"
            >
              <Users2 className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="sr-only">Nexis</span>
            </Link>
            {[{ icon: Home, label: "Gyms", active: true }].map(
              ({ icon: Icon, label, active }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/super-admin/gyms"
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        active
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              )
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Breadcrumb */}
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard/super-admin/">Admin Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard/super-admin">Admins</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Search Bar */}
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src={ProfileImg}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Admins</CardTitle>
                    <CardDescription>Manage gym admins</CardDescription>
                  </div>
                  <Button variant="outline" onClick={openDialogForAdd}>
                    Add Admin
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {/* <TableHead>Image</TableHead> */}
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id}>
                        {/* <TableCell>
                          <Image
                            src={admin.image}
                            alt="Admin Image"
                            width={64}
                            height={64}
                            className="rounded-md"
                          />
                        </TableCell> */}
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{admin.status}</Badge>
                        </TableCell>
                        <TableCell>{admin.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openDialogForEdit(admin)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{admins.length}</strong> Admin(s)
                </div>
              </CardFooter>
            </Card>
          </main>
        </div>

        {/* Add/Edit Admin Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedAdmin ? "Edit Admin" : "Add New Admin"}</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <AdminForm {...(selectedAdmin || {})} />
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default SuperAdminDashboard;
