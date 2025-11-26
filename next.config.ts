/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites(){
        return [
            {
                source: "/api/:path*",
                destination: "https://cllario-back.vercel.app/api/:path*",
            }
        ]
    }
};

export default nextConfig;
