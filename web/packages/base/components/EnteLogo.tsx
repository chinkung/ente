import { styled } from "@mui/material";
import React from "react";

interface EnteLogoProps {
    /**
     * The height of the logo image, in pixels.
     *
     * Default: 18px
     */
    height?: number;
}

/**
 * The Ente logo ("ente" in Montserrat).
 *
 * **This relies on the presence of images/ente.svg in the public folder.**
 *
 * This is meant as a standard img element that can be used in places where we
 * need to show the Ente branding. The img is backed by an an SVG.
 *
 * @see {@link EnteLogoSvg} for a variant but visually similar component that
 * uses an inline svg instead.
 *
 * The img has a default height of 18px, but can be customized using the
 * {@link height} prop.
 *
 * The img also has a 3px vertical margin on both sides.
 */
export const EnteLogo: React.FC<EnteLogoProps> = ({ height }) => (
    <LogoImage height={height ?? 18} alt="Ente" src="/images/ente.svg" />
);

const LogoImage = styled("img")`
    margin: 3px 0;
    vertical-align: middle;
`;

/**
 * The Ente logo ("ente" in Montserrat), as an inline svg.
 *
 * Having it as an inline SVG has two advantages:
 *
 * - It does not rely on a corresponding asset in the public folder
 * - It can be styled using CSS.
 *
 * The default height of the SVG element is 18px, same as the {@link EnteLogo}
 * img (Unlike the img, it does not have any extra margin).
 *
 * The size can be customized by providing a {@link height} prop (the SVG will
 * preserve its aspect ratio when fitting inside the provided viewport).
 */
export const EnteLogoSVG: React.FC<EnteLogoProps> = ({ height }) => (
    <svg
        height={height ?? "18"}
        viewBox="0 0 43 13"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6.102 12.144C4.998 12.144 4.026 11.928 3.186 11.496C2.358 11.064 1.716 10.476 1.26 9.732C0.804 8.976 0.576 8.118 0.576 7.158C0.576 6.186 0.798 5.328 1.242 4.584C1.698 3.828 2.316 3.24 3.096 2.82C3.876 2.388 4.758 2.172 5.742 2.172C6.69 2.172 7.542 2.376 8.298 2.784C9.066 3.18 9.672 3.756 10.116 4.512C10.56 5.256 10.782 6.15 10.782 7.194C10.782 7.302 10.776 7.428 10.764 7.572C10.752 7.704 10.74 7.83 10.728 7.95H2.862V6.312H9.252L8.172 6.798C8.172 6.294 8.07 5.856 7.866 5.484C7.662 5.112 7.38 4.824 7.02 4.62C6.66 4.404 6.24 4.296 5.76 4.296C5.28 4.296 4.854 4.404 4.482 4.62C4.122 4.824 3.84 5.118 3.636 5.502C3.432 5.874 3.33 6.318 3.33 6.834V7.266C3.33 7.794 3.444 8.262 3.672 8.67C3.912 9.066 4.242 9.372 4.662 9.588C5.094 9.792 5.598 9.894 6.174 9.894C6.69 9.894 7.14 9.816 7.524 9.66C7.92 9.504 8.28 9.27 8.604 8.958L10.098 10.578C9.654 11.082 9.096 11.472 8.424 11.748C7.752 12.012 6.978 12.144 6.102 12.144ZM18.5375 2.172C19.3055 2.172 19.9895 2.328 20.5895 2.64C21.2015 2.94 21.6815 3.408 22.0295 4.044C22.3775 4.668 22.5515 5.472 22.5515 6.456V12H19.7435V6.888C19.7435 6.108 19.5695 5.532 19.2215 5.16C18.8855 4.788 18.4055 4.602 17.7815 4.602C17.3375 4.602 16.9355 4.698 16.5755 4.89C16.2275 5.07 15.9515 5.352 15.7475 5.736C15.5555 6.12 15.4595 6.612 15.4595 7.212V12H12.6515V2.316H15.3335V4.998L14.8295 4.188C15.1775 3.54 15.6755 3.042 16.3235 2.694C16.9715 2.346 17.7095 2.172 18.5375 2.172ZM29.0568 12.144C27.9168 12.144 27.0288 11.856 26.3928 11.28C25.7568 10.692 25.4388 9.822 25.4388 8.67V0.174H28.2468V8.634C28.2468 9.042 28.3548 9.36 28.5708 9.588C28.7868 9.804 29.0808 9.912 29.4528 9.912C29.8968 9.912 30.2748 9.792 30.5868 9.552L31.3428 11.532C31.0548 11.736 30.7068 11.892 30.2988 12C29.9028 12.096 29.4888 12.144 29.0568 12.144ZM23.9448 4.692V2.532H30.6588V4.692H23.9448ZM37.4262 12.144C36.3222 12.144 35.3502 11.928 34.5102 11.496C33.6822 11.064 33.0402 10.476 32.5842 9.732C32.1282 8.976 31.9002 8.118 31.9002 7.158C31.9002 6.186 32.1222 5.328 32.5662 4.584C33.0222 3.828 33.6402 3.24 34.4202 2.82C35.2002 2.388 36.0822 2.172 37.0662 2.172C38.0142 2.172 38.8662 2.376 39.6222 2.784C40.3902 3.18 40.9962 3.756 41.4402 4.512C41.8842 5.256 42.1062 6.15 42.1062 7.194C42.1062 7.302 42.1002 7.428 42.0882 7.572C42.0762 7.704 42.0642 7.83 42.0522 7.95H34.1862V6.312H40.5762L39.4962 6.798C39.4962 6.294 39.3942 5.856 39.1902 5.484C38.9862 5.112 38.7042 4.824 38.3442 4.62C37.9842 4.404 37.5642 4.296 37.0842 4.296C36.6042 4.296 36.1782 4.404 35.8062 4.62C35.4462 4.824 35.1642 5.118 34.9602 5.502C34.7562 5.874 34.6542 6.318 34.6542 6.834V7.266C34.6542 7.794 34.7682 8.262 34.9962 8.67C35.2362 9.066 35.5662 9.372 35.9862 9.588C36.4182 9.792 36.9222 9.894 37.4982 9.894C38.0142 9.894 38.4642 9.816 38.8482 9.66C39.2442 9.504 39.6042 9.27 39.9282 8.958L41.4222 10.578C40.9782 11.082 40.4202 11.472 39.7482 11.748C39.0762 12.012 38.3022 12.144 37.4262 12.144Z" />
    </svg>
);
