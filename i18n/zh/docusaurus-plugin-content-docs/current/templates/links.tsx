import React from "react";

export const discordInvitationLink = 'https://discord.com/invite/conflux-network';

export function DiscordLink({ children }) {
    return <a href={discordInvitationLink} target="_blank">{children}</a>;
}
