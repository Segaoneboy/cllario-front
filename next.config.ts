/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites(){
        return [
            {
                source: "/api/:path*",
                destination: "http://2.56.240.91:5000/api/:path*",
            }
        ]
    }
};

export default nextConfig;
