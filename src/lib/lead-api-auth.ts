const AUTH_SCHEME = "Bearer";

function getCrmApiToken() {
  return process.env.CRM_API_TOKEN ?? "";
}

export function isCrmApiAuthorized(request: Request): boolean {
  const token = getCrmApiToken();

  if (!token) {
    console.error("crm api token is not configured");
    return false;
  }

  const header = request.headers.get("authorization");

  if (!header) {
    return false;
  }

  const [scheme, value] = header.split(" ");
  return scheme === AUTH_SCHEME && value === token;
}
