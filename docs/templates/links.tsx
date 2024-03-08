import React from "react";

export const discordInvitationLink = 'https://discord.gg/conflux-network-707952293412339843';

export function DiscordLink({ children }) {
    return <a href={discordInvitationLink} target="_blank">{children}</a>;
}
