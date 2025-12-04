import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";

import {
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
} from "@/components/ui/resizable-navbar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  loader: async ({ params, context: { fetchPosts } }) => {
    console.log(params);

    return await fetchPosts();
  },
});

function HomeComponent() {
  // const data = Route.useLoaderData();
  // console.log(data);
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <Hero />
    </main>
  );
}

function Hero() {
  return (
    <React.Fragment>
      <Navbar className="fixed top-2 z-50 w-full">
        <NavBody className="min-w-[920px]!">
          <div className="flex flex-row">
            <NavbarLogo />
            <DesktopNavigationMenu />
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton href="#" variant="secondary">
              Sign In
            </NavbarButton>
            <NavbarButton href="#" variant="primary">
              Sign Up
            </NavbarButton>
          </div>
        </NavBody>
        <MobileNavigationMenu />
      </Navbar>
      <section className="relative overflow-x-hidden bg-linear-to-br from-blue-50 via-white to-indigo-100 dark:from-stone-900 dark:via-stone-950 dark:to-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div
            id="animated-hero-section-content-container"
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Pill to show trust message */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 select-none dark:bg-blue-900 dark:text-blue-200">
                  ✨ Trusted by enterprise worldwide
                </div>
              </div>
              <h1 className="text-foreground mb-6 text-4xl font-bold select-none sm:text-5xl lg:text-6xl">
                Build Enterprise Apps{" "}
                <span className="block text-blue-600 dark:text-blue-400">
                  10x faster
                </span>
              </h1>
              <p className="text-foreground mx-auto mb-8 max-w-3xl text-lg sm:text-xl">
                The only platform you need to create enterprise applications,
                automate workflows, and build custom dashboards—all with the
                power of low-code and the flexibility of custom development.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
                <Link to="/">
                  <Button className="bg-primary w-full" variant={"default"}>
                    Get Started
                  </Button>
                </Link>
                <Link
                  to={
                    import.meta.env.NEXT_PUBLIC_DEV_MODE === "true" ? "/" : "/"
                  }
                >
                  <Button className="w-full" variant={"link"}>
                    {import.meta.env.NEXT_PUBLIC_DEV_MODE === "true"
                      ? "See it in action"
                      : "Watch Demo"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div id="animated-hero-section-stats-container" className="">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 grid grid-cols-1 gap-4 text-center sm:mt-20 lg:grid-cols-4"
            >
              <HeroStatsAboutEnterprisePortfolio />
            </motion.div>
          </div>
        </div>
        {/* Floating Sparkles */}
        <div className="absolute top-20 left-4 opacity-20 sm:left-10">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden sm:block"
          >
            <Sparkles className="h-6 w-6 text-blue-500 sm:h-8 sm:w-8 dark:text-blue-400" />
          </motion.div>
        </div>
        {/* Floating Globe */}
        <div className="absolute top-40 right-4 opacity-20 sm:right-20">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="hidden sm:block"
          >
            <Globe className="h-6 w-6 text-indigo-500 sm:h-8 sm:w-8 dark:text-indigo-400" />
          </motion.div>
        </div>
      </section>
    </React.Fragment>
  );
}

function HeroStatsAboutEnterprisePortfolio() {
  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Apps Built", value: "100K+" },
    { label: "Time Saved", value: "2M+ hrs" },
    { label: "Enterprise Clients", value: "500+" },
  ];
  return (
    <React.Fragment>
      {stats.map((stat) => (
        <CardSpotlight
          key={stat.label}
          className="group cursor-pointer rounded-lg border-stone-200 bg-white backdrop-blur-sm dark:bg-neutral-900/60"
        >
          <div className="">
            <div className="relative text-2xl font-bold text-stone-900 group-hover:text-white sm:text-3xl dark:text-white">
              {stat.value}
            </div>
            <div className="relative text-sm text-stone-900 group-hover:text-white sm:text-base dark:text-white">
              {stat.label}
            </div>
          </div>
        </CardSpotlight>
      ))}
    </React.Fragment>
  );
}

// Database-friendly navigation types (shared with desktop)
// export type NavItem = {
//   id: string;
//   label: string;
//   href?: string;
//   icon?: React.ReactNode;
//   description?: string;
//   children?: NavItem[];
//   type?: "link" | "group" | "divider";
// };

export function MobileNavigationMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Example nav data (to be fetched from DB in future, shared with desktop)
  const NAV_ITEMS: NavItem[] = [
    {
      id: "workspace",
      label: "Dev Center",
      description:
        "Main workspace for building and managing your enterprise apps.",
      type: "group",
      children: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/",
          description:
            "Low-code enterprise app builder for workflow automation, database design, and UI creation.",
          type: "link",
        },
        {
          id: "workflows",
          label: "Workflow Builder",
          href: "/workflows",
          description: "Design and manage business workflows visually.",
          type: "link",
        },
        {
          id: "database",
          label: "Data Modeler",
          href: "/database",
          description:
            "Low-code table and schema designer for your data models.",
          type: "link",
        },
        {
          id: "ui-builder",
          label: "Interface Designer",
          href: "/ui-builder",
          description: "Drag-and-drop UI builder for enterprise-grade apps.",
          type: "link",
        },
      ],
    },
    {
      id: "playground",
      label: "Playground",
      description: "Experiment and test APIs, queries, and data.",
      type: "group",
      children: [
        {
          id: "rest-playground",
          label: "REST API Tester",
          href: "/playground/rest",
          description: "Test and explore REST APIs visually.",
          type: "link",
        },
        {
          id: "graphql-playground",
          label: "GraphQL Explorer",
          href: "/playground/graphql",
          description: "Interact with GraphQL endpoints and schemas.",
          type: "link",
        },
        {
          id: "db-playground",
          label: "Database Query Tool",
          href: "/playground/database",
          description: "Query and visualize your data in real time.",
          type: "link",
        },
      ],
    },
    {
      id: "learn",
      label: "Learn",
      description: "Learning resources, tutorials, and examples.",
      type: "group",
      children: [
        {
          id: "getting-started",
          label: "Get Started",
          href: "/",
          description: "Quickstart guides and onboarding.",
          type: "link",
        },
        {
          id: "tutorials",
          label: "Step-by-Step Guides",
          href: "/",
          description: "Step-by-step tutorials for building apps.",
          type: "link",
        },
        {
          id: "api-reference",
          label: "API Docs",
          href: "/",
          description: "Comprehensive API documentation.",
          type: "link",
        },
        {
          id: "examples",
          label: "Sample Projects",
          href: "/",
          description: "Sample apps and workflow templates.",
          type: "link",
        },
      ],
    },
    {
      id: "docs",
      label: "Docs",
      description: "Documentation and guides for using Velocilogic.",
      type: "link",
      href: "/",
    },
  ];

  return (
    <MobileNav>
      <MobileNavHeader>
        <NavbarLogo />
        <MobileNavToggle
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </MobileNavHeader>

      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <div className="w-full">
          {NAV_ITEMS.map((item, idx) => {
            if (item.type === "link") {
              return (
                <div
                  key={item.id}
                  className={
                    idx !== 0 ? "border-muted/30 mt-2 border-t pt-2" : ""
                  }
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:bg-primary/10 focus:bg-primary/20 block rounded-lg px-3 py-2 pl-0 text-sm font-medium text-neutral-700 transition-colors focus:outline-none dark:text-neutral-200"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-primary flex items-center gap-2 text-base font-semibold">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-muted-foreground mt-0.5 text-xs">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </a>
                </div>
              );
            }
            if (item.type === "group" && item.children) {
              return (
                <div
                  key={item.id}
                  className={
                    idx !== 0 ? "border-muted/30 mt-2 border-t pt-2" : ""
                  }
                >
                  <Accordion type="single" className="w-full" collapsible>
                    <AccordionItem value={item.id}>
                      <AccordionTrigger>
                        <div className="flex w-full flex-col items-start">
                          <span className="text-primary flex items-center gap-2 text-base font-semibold">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="text-muted-foreground mt-0.5 text-xs">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="mt-2 flex flex-col gap-1">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <a
                                href={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:bg-primary/10 focus:bg-primary/20 block rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors focus:outline-none dark:text-neutral-200"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            }
            return null;
          })}
        </div>
      </MobileNavMenu>
    </MobileNav>
  );
}

// Database-friendly navigation types
export type NavItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  description?: string;
  children?: NavItem[];
  type?: "link" | "group" | "divider";
};

// Example nav data (to be fetched from DB in future)
const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Dev Center",
    description:
      "Main workspace for building and managing your enterprise apps.",
    type: "group",
    children: [
      {
        id: "home-main",
        label: "Dashboard",
        href: "/",
        description:
          "Low-code enterprise app builder for workflow automation, database design, and UI creation.",
        type: "link",
      },
      {
        id: "workflows",
        label: "Workflow Builder",
        href: "/workflows",
        description: "Design and manage business workflows visually.",
        type: "link",
      },
      {
        id: "database",
        label: "Data Modeler",
        href: "/database",
        description: "Low-code table and schema designer for your data models.",
        type: "link",
      },
      {
        id: "ui-builder",
        label: "Interface Designer",
        href: "/ui-builder",
        description: "Drag-and-drop UI builder for enterprise-grade apps.",
        type: "link",
      },
    ],
  },
  // {
  //   id: 'simple',
  //   label: 'UI Elements',
  //   description: 'Quick access to basic UI elements and blocks.',
  //   type: 'group',
  //   children: [
  //     {
  //       id: 'simple-components',
  //       label: 'Component Library',
  //       href: '/components',
  //       description: 'Reusable UI components for your apps.',
  //       type: 'link',
  //     },
  //     {
  //       id: 'simple-documentation',
  //       label: 'Component Docs',
  //       href: '/documentation',
  //       description: 'Basic documentation for components and usage.',
  //       type: 'link',
  //     },
  //     {
  //       id: 'simple-blocks',
  //       label: 'UI Blocks',
  //       href: '/blocks',
  //       description: 'Prebuilt UI blocks for rapid development.',
  //       type: 'link',
  //     },
  //   ],
  // },
  {
    id: "playground",
    label: "Playground",
    description: "Experiment and test APIs, queries, and data.",
    type: "group",
    children: [
      {
        id: "rest-playground",
        label: "REST API Tester",
        href: "/playground/rest",
        description: "Test and explore REST APIs visually.",
        type: "link",
      },
      {
        id: "graphql-playground",
        label: "GraphQL Explorer",
        href: "/playground/graphql",
        description: "Interact with GraphQL endpoints and schemas.",
        type: "link",
      },
      {
        id: "db-playground",
        label: "Database Query Tool",
        href: "/playground/database",
        description: "Query and visualize your data in real time.",
        type: "link",
      },
    ],
  },
  // {
  //   id: 'with-icon',
  //   label: 'Task Status',
  //   description: 'Task management with visual status icons.',
  //   type: 'group',
  //   children: [
  //     {
  //       id: 'backlog',
  //       label: 'Backlog',
  //       href: '/backlog',
  //       icon: <CircleHelpIcon />,
  //       description: 'View items in the backlog.',
  //       type: 'link',
  //     },
  //     {
  //       id: 'todo',
  //       label: 'To Do',
  //       href: '/todo',
  //       icon: <CircleIcon />,
  //       description: 'Tasks to be completed.',
  //       type: 'link',
  //     },
  //     {
  //       id: 'done',
  //       label: 'Done',
  //       href: '/done',
  //       icon: <CircleCheckIcon />,
  //       description: 'Completed tasks.',
  //       type: 'link',
  //     },
  //   ],
  // },
  {
    id: "learn",
    label: "Learn",
    description: "Learning resources, tutorials, and examples.",
    type: "group",
    children: [
      {
        id: "getting-started",
        label: "Get Started",
        href: "/",
        description: "Quickstart guides and onboarding.",
        type: "link",
      },
      {
        id: "tutorials",
        label: "Step-by-Step Guides",
        href: "/",
        description: "Step-by-step tutorials for building apps.",
        type: "link",
      },
      {
        id: "api-reference",
        label: "API Docs",
        href: "/",
        description: "Comprehensive API documentation.",
        type: "link",
      },
      {
        id: "examples",
        label: "Sample Projects",
        href: "/",
        description: "Sample apps and workflow templates.",
        type: "link",
      },
    ],
  },
  {
    id: "docs",
    label: "Docs",
    description: "Documentation and guides for using Velocilogic.",
    href: "/",
    type: "link",
  },
];
const getGroupUlClass = (id: string) => {
  if (id === "home")
    return "grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]";
  if (id === "references")
    return "grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]";
  if (id === "list") return "grid w-[300px] gap-4";
  return "grid w-[200px] gap-4";
};

const HomeMainNavItem = React.memo(function HomeMainNavItem({
  label,
  href,
  description,
}: {
  label: string;
  href?: string;
  description?: string;
}) {
  return (
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <Link
          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
          to={href || "#"}
        >
          <div className="mt-4 mb-2 text-lg font-medium">{label}</div>
          <p className="text-muted-foreground text-sm leading-tight">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

const ListItem = React.memo(function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: ListItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className={icon ? "flex items-center gap-2" : ""}>
            {icon && <span className="mr-2">{icon}</span>}
            <div className="text-sm leading-none font-medium">{title}</div>
          </div>
          {children && (
            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

const GroupNavMenu = React.memo(function GroupNavMenu({
  item,
}: {
  item: NavItem;
}) {
  return (
    <NavigationMenuItem key={item.id}>
      <NavigationMenuTrigger className="bg-transparent!">
        {item.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className={getGroupUlClass(item.id)}>
          {item.children?.map((child) => {
            if (child.id === "home-main") {
              return (
                <HomeMainNavItem
                  key={child.id}
                  label={child.label}
                  href={child.href}
                  description={child.description}
                />
              );
            }
            if (child.type === "link") {
              return (
                <ListItem
                  key={child.id}
                  href={child.href || "#"}
                  title={child.label}
                  icon={child.icon}
                >
                  {child.description}
                </ListItem>
              );
            }
            return null;
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
});

const LinkNavMenu = React.memo(function LinkNavMenu({
  item,
}: {
  item: NavItem;
}) {
  return (
    <NavigationMenuItem key={item.id}>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link to={item.href || "#"} className="bg-transparent!">
          {item.icon}
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
});

export function DesktopNavigationMenu() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {NAV_ITEMS.map((item) => {
          if (item.type === "link") {
            return <LinkNavMenu key={item.id} item={item} />;
          }
          if (item.type === "group" && item.children) {
            return <GroupNavMenu key={item.id} item={item} />;
          }
          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  icon?: React.ReactNode;
};
