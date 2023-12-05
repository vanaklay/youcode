import { FooterNav, SiteConfig } from '@/lib/site-config'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'

export const Footer = () => {
  return (
    <footer className="w-full border-t border-card">
      <div className="m-auto w-full max-w-3xl px-2 py-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/images/you-code.svg"
              width={40}
              height={30}
              alt="app logo"
            />
            <Typography variant="base" as={Link} href="/">
              {SiteConfig.title}
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
            {FooterNav.map((item) => (
              <Link key={item.id} className="hover:underline" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Typography variant="base" className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} All right reserved
          </Typography>
        </div>
      </div>
    </footer>
  )
}
