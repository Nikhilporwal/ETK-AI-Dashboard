"use client";

import { useEffect, useRef } from "react";
import { JobFormData, useGlobalContext } from "@/context/JobContext";

export default function AuthInitializer({ data, user_id, email }: { data: JobFormData, user_id: string, email: string }) {
    const { setFormData, setUserDetails } = useGlobalContext();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current && data) {
            if (data) {
                setFormData(data);
            }
            setUserDetails({ email: email, user_id: user_id });
            initialized.current = true;
        }
    }, [data, setFormData, user_id, setUserDetails]);

    return null;
}