import a7Thumbnail from "../assets/a7 thumbnail.png";
import arcUi from "../assets/ARC.png";
import catcalThumbnail from "../assets/catcal thumbnail.png";
import cestDashboard from "../assets/cest dashboard web.png";
import doctorSanti from "../assets/doctor santi web.png";
import hirayaThumbnail from "../assets/hiraya thumbnail.png";
import initifyThumbnail from "../assets/initify thumbnail.png";
import keaBabiesVideo from "../assets/SampleTas-KeaBabies.mp4";
import laborlinkzMobile from "../assets/LaborLinkz.png";
import laborlinkzUi from "../assets/LaborLinkz Figma.png";
import marianPottery from "../assets/Marian's.png";
import plantoUi from "../assets/planto web.png";
import plantpalUi from "../assets/Plantpal.png";
import quizWhirl from "../assets/QuizWHirl.png";
import sourcingAnalysis from "../assets/sourcing analysis web.png";
import triregMobile from "../assets/Trireg mobile.png";
import triregUi from "../assets/trireg mobile figma.png";
import triregWeb from "../assets/trireg for web.png";
import ultimateLed from "../assets/ultimate led course web.png";
import vertereWeb from "../assets/vertere web.png";
import vtrackMobile from "../assets/Vtrack mobile.png";
import vtrackUi from "../assets/Vtrack mobile figma.png";
import vtrackWeb from "../assets/vtrack web dashboard.png";

/** Project preview images keyed by project id */
export const projectImages: Record<string, string> = {
  "trireg-web": triregWeb,
  "vtrack-web": vtrackWeb,
  "doctor-santi": doctorSanti,
  "cest-dashboard": cestDashboard,
  "marian-pottery": marianPottery,
  "quiz-whirl": quizWhirl,
  "trireg-mobile": triregMobile,
  "vtrack-mobile": vtrackMobile,
  laborlinkz: laborlinkzMobile,
  initify: initifyThumbnail,
  catcal: catcalThumbnail,
  hiraya: hirayaThumbnail,
  "ultimate-led": ultimateLed,
  vertere: vertereWeb,
  "a7-recruitment": a7Thumbnail,
  "vtrack-ui-mobile": vtrackUi,
  "vtrack-ui-web": vtrackWeb,
  "trireg-ui-mobile": triregUi,
  "trireg-ui-web": triregWeb,
  "laborlinkz-ui": laborlinkzUi,
  "arc-ui-web": arcUi,
  "arc-ui-mobile": arcUi,
  plantpal: plantpalUi,
  "sourcing-analysis": sourcingAnalysis,
  planto: plantoUi,
};

/** Video previews keyed by project id (large files kept local only) */
export const projectVideos: Record<string, string> = {
  "kea-babies": keaBabiesVideo,
};

export function getProjectImage(projectId: string) {
  return projectImages[projectId];
}

export function getProjectVideo(projectId: string) {
  return projectVideos[projectId];
}
