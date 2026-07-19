import { Container, Group, Image } from '@mantine/core'
import Link from 'next/link'
import classes from '@/styles/Header.module.css'
import { pageConfig } from '@/uptime.config'
import { PageConfigLink } from '@/types/config'
import { useTranslation } from 'react-i18next'

export default function Header({ style }: { style?: React.CSSProperties }) {
  const { t } = useTranslation('common')
  const linkToElement = (link: PageConfigLink, i: number) => (
    <a
      key={i}
      href={link.link}
      target={link.link.startsWith('/') ? undefined : '_blank'}
      rel={link.link.startsWith('/') ? undefined : 'noreferrer'}
      className={classes.link}
      data-active={link.highlight}
    >
      {link.label}
    </a>
  )

  const links = [{ label: t('Incidents'), link: '/incidents' }, ...(pageConfig.links || [])]

  return (
    <header className={classes.header} style={style}>
      <Container size="md" className={classes.inner}>
        <Link href="/" aria-label="Gabe's media server status home">
          <Image
            src={pageConfig.logo ?? '/logo.svg'}
            h={56}
            w={{ base: 180, sm: 240 }}
            fit="contain"
            alt="Gabe's Media Status"
          />
        </Link>

        <Group gap={5} visibleFrom="sm">
          {links.map(linkToElement)}
        </Group>

        <Group gap={5} hiddenFrom="sm">
          {links.filter((link) => link.highlight || link.link.startsWith('/')).map(linkToElement)}
        </Group>
      </Container>
    </header>
  )
}
