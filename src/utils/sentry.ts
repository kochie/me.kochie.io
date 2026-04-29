import * as Sentry from '@sentry/node'

export const init = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
      integrations: [
        ...(process.env.NEXT_IS_SERVER === 'true' &&
        process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
          ? [
              Sentry.rewriteFramesIntegration({
                iteratee: (frame) => {
                  const rootDir =
                    process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
                  if (frame.filename && rootDir) {
                    frame.filename = frame.filename
                      .replace(rootDir, 'app:///')
                      .replace('.next', '_next')
                  }
                  return frame
                },
              }),
            ]
          : []),
      ],
    })
  }
}
