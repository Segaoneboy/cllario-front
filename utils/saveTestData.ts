export async function saveGuestTest() {
    const raw = localStorage.getItem("guestTestResult");
    if (!raw) return { saved: false };

    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch {
        localStorage.removeItem("guestTestResult");
        return { saved: false };
    }

    const res = await fetch("/api/test/save", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
    });

    if (!res.ok) {
        throw new Error("Ошибка сохранения теста");
    }

    localStorage.removeItem("guestTestResult");
    return { saved: true };
}
