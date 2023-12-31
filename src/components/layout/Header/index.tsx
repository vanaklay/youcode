import { SiteConfig } from '@/lib/site-config'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Typography } from '@/components/ui/typography'
import Auth from '@/features/auth'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-baseline gap-6 md:gap-10">
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
          <div className="flex flex-1 justify-center gap-3">
            <Typography
              as={Link}
              variant="link"
              href={`/courses`}
              className="text-muted-foreground hover:text-foreground"
            >
              explorer
            </Typography>
            <Typography
              as={Link}
              variant="link"
              href={`/mycourses`}
              className="text-muted-foreground hover:text-foreground"
            >
              my courses
            </Typography>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Auth />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
