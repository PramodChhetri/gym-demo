'use client';

import ProfileImg from "../../../../assets/img/P.jpg";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '../../../libs/auth';
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  PanelLeft,
  Search,
  Settings,
  Users2,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const GymAdminDashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const role = Auth.getRole();

    // Redirect to login if the user is not a Super Admin
    // if (role !== 'Super Admin') {
    //   router.push('/login');
    // }
  }, [router]);

  const gyms = [
    {
      name: "Pramod Chhetri",
      status: "Paid",
      createdAt: "2023-07-12 10:42 AM",
    },
    {
      name: "Mahendra Adk",
      status: "Unpaid",
      createdAt: "2023-10-18 03:21 PM",
    },
    {
      name: "Krishna T",
      status: "Active",
      createdAt: "2023-11-29 08:15 AM",
    },
  ];

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
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  {[{ icon: Home, label: "Dashboard" }].map(
                    ({ icon: Icon, label }) => (
                      <Link
                        key={label}
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </Link>
                    )
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Breadcrumb */}
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard/super-admin">Admin Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard/super-admin/gyms">Gyms</Link>
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

          <Separator className="my-2" />

          {/* Dashboard Content */}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Gyms</CardTitle>
                <CardDescription>
                  Manage gyms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gyms.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Image
                            src={ProfileImg}
                            alt="Product Image"
                            width={64}
                            height={64}
                            className="rounded-md"
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.status}</Badge>
                        </TableCell>
                        <TableCell>{product.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
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
                  Showing <strong>1-3</strong> of <strong>3</strong> Gyms
                </div>
              </CardFooter>
            </Card>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default GymAdminDashboard;
