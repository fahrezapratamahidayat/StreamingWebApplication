export default function Layouts({
    children,
    Modal
}: {
    children: React.ReactNode;
    Modal: React.ReactNode
}) {
    return (
        <>
            {children}
            {Modal}
        </>
    );
}