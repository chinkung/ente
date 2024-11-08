import { DialogBoxAttributes } from "@ente/shared/components/DialogBox/types";
import { t } from "i18next";

export const getTrashFilesMessage = (
    deleteFileHelper,
): DialogBoxAttributes => ({
    title: t("TRASH_FILES_TITLE"),
    content: t("TRASH_FILES_MESSAGE"),
    proceed: {
        action: deleteFileHelper,
        text: t("MOVE_TO_TRASH"),
        variant: "critical",
    },
    close: { text: t("cancel") },
});

