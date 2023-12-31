import PageLayouts from "@/components/layouts/PageLayouts";

export default function Loading(){
    return (
        <>
        <PageLayouts>
            <div className="flex flex-col  ml-[21rem]">
                <div className="mt-[5rem]">
                    <h1 className="text-white">Loading</h1>
                </div>
            </div>
        </PageLayouts>
        </>
    )
}