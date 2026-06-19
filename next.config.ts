/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites(){
        return [
            {
                source: "/api/:path*",
                // destination: "https://cllario-back.vercel.app/api/:path*",
                destination: "http://localhost:5000/api/:path*"
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
