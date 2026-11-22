function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white py-6 px-6 mt-12">
            <p className="text-center font-serif text-sm text-gray-600 tracking-wide">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-[#e65322]">PlanPlate</span>{" "}
                — mealDB
            </p>
        </footer>
    );
}

export default Footer;