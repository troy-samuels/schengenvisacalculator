import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { OfflineStatus } from '@/components/offline-status'
import { MobileInstallPrompt } from '@/components/mobile-install-prompt'

export const metadata: Metadata = {
  title: 'Schengen Visa Calculator - 90/180 Day Rule Tracker',
  description: 'Calculate your Schengen visa compliance with our rolling 180-day period tracker. Plan your European travel and avoid overstaying with accurate 90/180 rule calculations.',
  keywords: 'Schengen visa, 90/180 rule, Europe travel, visa calculator, travel planning',
  manifest: '/manifest.json',
  icons: {
    apple: '/images/visa-calculator-logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Schengen Calculator',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'Schengen Visa Calculator - 90/180 Day Rule Tracker',
    description: 'Calculate your Schengen visa compliance with our rolling 180-day period tracker. Plan your European travel and avoid overstaying.',
    url: 'https://www.schengenvisacalculator.com',
    siteName: 'Schengen Visa Calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen Visa Calculator - 90/180 Day Rule Tracker',
    description: 'Calculate your Schengen visa compliance with our rolling 180-day period tracker. Plan your European travel and avoid overstaying.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#3b82f6" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Schengen Calculator" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="none" />
        <meta name="application-name" content="Schengen Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/images/visa-calculator-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/visa-calculator-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/visa-calculator-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/visa-calculator-logo.png" />
        <link rel="mask-icon" href="/images/visa-calculator-logo.png" color="#3b82f6" />
      </head>
      <body>
        <OfflineStatus />
        <MobileInstallPrompt />
        {children}
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                      
                      // Check for updates
                      registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              // New content is available, show update notification
                              if (confirm('New version available! Click OK to update.')) {
                                window.location.reload();
                              }
                            }
                          });
                        }
                      });
                    })
                    .catch(function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                });
              }

              // Install prompt for PWA
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                deferredPrompt = e;
                
                // Show install button or prompt
                const installButton = document.createElement('button');
                installButton.textContent = 'Install App';
                installButton.style.cssText = \`
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  background: #3b82f6;
                  color: white;
                  border: none;
                  padding: 12px 20px;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 14px;
                  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                  z-index: 1000;
                  font-family: inherit;
                \`;
                
                installButton.addEventListener('click', function() {
                  installButton.style.display = 'none';
                  deferredPrompt.prompt();
                  deferredPrompt.userChoice.then(function(choiceResult) {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the install prompt');
                    } else {
                      console.log('User dismissed the install prompt');
                    }
                    deferredPrompt = null;
                  });
                });
                
                document.body.appendChild(installButton);
                
                // Hide button after 10 seconds if not clicked
                setTimeout(function() {
                  if (installButton.parentNode) {
                    installButton.remove();
                  }
                }, 10000);
              });

              // Handle app installed event
              window.addEventListener('appinstalled', function() {
                console.log('PWA was installed');
                const installButtons = document.querySelectorAll('button[data-install]');
                installButtons.forEach(button => button.remove());
              });

              // Detect if app is running in standalone mode
              if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
                document.body.classList.add('standalone-mode');
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
