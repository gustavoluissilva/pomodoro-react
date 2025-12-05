export default function Button({label, isLink, isLarge, isActive, onClick }){

    const buttonClasses = `
        botoes
        ${isLink ? "btn-link" : ""}
        ${isLarge ? "btn-large" : ""}
        ${isActive ? "btn-active" : ""}
    `.trim();

    return (
        <>
            <button onClick={onClick} className={buttonClasses}>{label}</button>
        </>
    )
}