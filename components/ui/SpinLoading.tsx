"use client"

export default function SpinLoading({text}:{text:string}){
    return (
        <>
            <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-[#585858]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5170FF] border-t-transparent"></div>
                <p className="mt-4 text-sm font-semibold text-[#5170FF] animate-pulse">
                {text}
                </p>
            </div>
        </>
    )
}