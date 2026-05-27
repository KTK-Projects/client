import { useProjectsFilterStore } from "@/features/project/projects-filter";
import { cn } from "@/shared/lib/utils";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const TagFilter: React.FC<{ badge_url: string; tag: string }> = ({ badge_url, tag }) => {
    const tags = useProjectsFilterStore((store) => store.tags);

    const toggleFilterTag = useProjectsFilterStore((store) => store.toggleTag);
    const clearTags = useProjectsFilterStore((store) => store.clearTags);

    const location = useLocation();
    const navigate = useNavigate();

    const toggleActive = () => {
        toggleFilterTag(tag);
        navigate("/");
    };

    useEffect(() => {
        if (location.pathname !== "/") {
            clearTags();
        }
    }, [location]);

    return (
        <div
            className={cn(
                "flex items-center gap-3 mb-3 cursor-pointer",
                tags.includes(tag) && "underline opacity-80 ml-2",
            )}
            onClick={toggleActive}
        >
            <div className="max-w-7">
                <img src={badge_url} alt="" />
            </div>
            <p className="capitalize">{tag}</p>
        </div>
    );
};
