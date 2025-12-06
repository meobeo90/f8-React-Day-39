function Modal({title, children, onClose}) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-10" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-[380px]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button className="text-gray-600 hover:text-black text-xl font-bold cursor-pointer" onClick={onClose}>x</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}
export default Modal;