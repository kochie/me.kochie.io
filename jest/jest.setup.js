const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

process.env = {
    ...process.env,
    __NEXT_IMAGE_OPTS: {
        deviceSizes: [320, 420, 768, 1024, 1200],
        imageSizes: [],
        domains: ['me.kochie.io', 'cdn-images-1.medium.com'],
        path: '/_next/image',
        loader: 'default',
    },
};
