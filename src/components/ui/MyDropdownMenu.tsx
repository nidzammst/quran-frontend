import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./button";
import { usePathname, useRouter } from "next/navigation";
import { useTranslationIdStore } from "@/lib/stores/store";

export function MyDropdownMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTranslationId } = useTranslationIdStore();

  const changePathname = (lang: "id" | "ar" | "en"): void => {
    setTranslationId(lang);
    const path = pathname.split("/");
    path[1] = lang;
    const newPath = path.join("/");
    router.push(newPath);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Config</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-3">
        <DropdownMenuLabel className="font-bold">Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => changePathname("id")}>
            Indonesia
            <DropdownMenuShortcut>ID</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changePathname("ar")}
            className="font-arabic"
          >
            عربي
            <DropdownMenuShortcut>AR</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changePathname("en")}>
            English
            <DropdownMenuShortcut>EN</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-bold">Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Dark</DropdownMenuItem>
          <DropdownMenuItem>Light</DropdownMenuItem>
          <DropdownMenuItem>System</DropdownMenuItem>
          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}
          {/* <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="https://github.com/nidzammst">GitHub</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
