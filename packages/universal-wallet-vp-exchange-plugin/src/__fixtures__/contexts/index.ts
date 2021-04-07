import * as did from "@transmute/did-context";
import * as sec from "@transmute/security-context";
import * as cred from "@transmute/credentials-context";

export const contexts: any = {
  [sec.constants.SECURITY_CONTEXT_V1_URL]: sec.contexts.get(
    sec.constants.SECURITY_CONTEXT_V1_URL
  ),
  [sec.constants.SECURITY_CONTEXT_V2_URL]: sec.contexts.get(
    sec.constants.SECURITY_CONTEXT_V2_URL
  ),
  [cred.constants.CREDENTIALS_CONTEXT_V1_URL]: cred.contexts.get(
    cred.constants.CREDENTIALS_CONTEXT_V1_URL
  ),
  [did.constants.DID_CONTEXT_V1_URL]: did.contexts.get(
    did.constants.DID_CONTEXT_V1_URL
  ),
};
