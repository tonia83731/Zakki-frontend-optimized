import { SubTitle } from "../common/Title";

import TwitterIcon from "../../assets/svg/icons8-twitter-circled-50.svg";
import LinkedInIcon from "../../assets/svg/icons8-linkedin-50.svg";
import YoutubeIcon from "../../assets/svg/Youtube.svg";

export default function FooterFollowSection({ title }: { title: string }) {
  return (
    <section className="flex flex-col gap-2 md:gap-4">
      <SubTitle color="text-white">{title}</SubTitle>
      <div className="flex items-center gap-4">
        <a className="img-link" href="https://twitter.com/AksiZAKKI">
          <TwitterIcon />
        </a>
        <a
          className="img-link"
          href="https://www.linkedin.com/company/zakki/?trk=public_profile_volunteering-position_profile-section-card_full-click&originalSubdomain=in"
        >
          <LinkedInIcon />
        </a>
        <a
          className="img-link"
          href="https://www.youtube.com/channel/UCKFr6Tc9VgQvANzUpVJIgrg"
        >
          <YoutubeIcon />
        </a>
      </div>
    </section>
  );
}
