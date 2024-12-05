import React from "react";

export const discordInvitationLink = 'https://discord.gg/confluxnetwork';

export function DiscordLink({ children }) {
    return <a href={discordInvitationLink} target="_blank">{children}</a>;
}
