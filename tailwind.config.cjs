module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './mdx-components.tsx'],
  darkMode: ['class'], // or 'media' or 'class'
  theme: {
  	extend: {
  		transitionDelay: {
  			'0': '0ms'
  		},
  		grayscale: {
  			'25': '25%',
  			'35': '35%',
  			'50': '50%'
  		},
  		colors: {
  			gitlab: '#db3b21',
  			medium: '#000000',
  			github: '#333333',
  			instagram: '#833ab4',
  			twitter: '#1da1f2',
  			linkedin: '#0077b5',
  			mastodon: '#008ada',
  			cottonBureau: '#f26355',
  			bluesky: '#1185fe',
  			wheat: 'wheat',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'city-image': "url('/images/background-1.webp')",
  			'airplane-image': "url('/images/background.webp')"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require("tailwindcss-animate")],
}
