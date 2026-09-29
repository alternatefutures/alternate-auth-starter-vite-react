import { SignIn, SignedIn, SignedOut, UserButton, useAuth, useSession } from '@alternatefutures/ac-auth-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
      <Label className="text-muted-foreground sm:w-40 sm:shrink-0">{label}</Label>
      <div className="min-w-0 flex-1 text-sm break-all">{children}</div>
    </div>
  );
}

function Dashboard() {
  const { session } = useSession();
  const { refresh } = useAuth();
  if (!session) return null;
  const { user } = session;
  const none = <span className="text-muted-foreground">none</span>;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Dashboard</CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <span>Signed in as {user.name ?? user.email ?? user.key}.</span>
          <Badge variant="outline">{session.status}</Badge>
          <span>Access token valid until {new Date(session.expiresAt).toLocaleTimeString()}.</span>
          <Button variant="link" size="sm" className="h-auto p-0" onClick={() => void refresh()}>
            refresh
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Row label="Local user key"><code>{user.key}</code></Row>
        <Separator />
        <Row label="Subject"><code>{user.id}</code></Row>
        <Separator />
        <Row label="Name">{user.name ?? none}</Row>
        <Separator />
        <Row label="Email">
          {user.email ?? none}
          {user.emailVerified ? <Badge variant="secondary" className="ml-2">verified</Badge> : null}
        </Row>
        <Separator />
        <Row label="Primary wallet">{user.wallet ? <code>{user.wallet}</code> : none}</Row>
        <Separator />
        <Row label="All wallets">{user.wallets.length ? user.wallets.map((w) => <code key={w} className="mr-2">{w}</code>) : none}</Row>
        <Separator />
        <Row label="Organization">
          {user.org ? (
            <span>
              {user.org.name} <Badge variant="outline">{user.org.role}</Badge>
            </span>
          ) : (
            <span className="text-muted-foreground">not requested (add the org scope)</span>
          )}
        </Row>
        <Separator />
        <Row label="Scopes"><code>{session.tokens?.scope ?? '-'}</code></Row>
      </CardContent>
    </Card>
  );
}

export function App() {
  return (
    <div className="min-h-screen">
      {/* The web app's top navigation shape: a 14-unit bar, brand left, account right. Signed-out visitors get no bar: the sign-in card is the whole page. */}
      <SignedIn>
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-6">
            <a href="/" className="px-2 py-1 text-xl font-bold text-foreground">
              Starter
            </a>
            <div className="flex items-center gap-4">
              <UserButton returnTo="/" />
            </div>
          </div>
        </header>
      </SignedIn>
      <SignedOut fallback={<div className="flex min-h-screen items-center justify-center p-4 text-sm text-muted-foreground">Checking your session...</div>}>
        {/* The web app's auth shell (components/auth/AuthPage.tsx AuthShell): the card centered in the viewport. */}
        <div className="flex min-h-screen items-center justify-center p-4 py-10 lg:p-12">
          <SignIn appName="Starter" returnTo="/" termsUrl="/terms" privacyUrl="/privacy" />
        </div>
      </SignedOut>
      <SignedIn>
        <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
          <Dashboard />
        </main>
      </SignedIn>
    </div>
  );
}
