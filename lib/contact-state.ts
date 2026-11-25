export type ContactState = {
  status: "idle" | "error" | "success";
  submissionId: string;
  error?:
    | "rate"
    | "captcha"
    | "fields"
    | "maxfiles"
    | "totalsize"
    | "maxsize"
    | "type"
    | "mail"
    | "duplicate";
  requestId?: string;
};
export const contactErrors: Record<
  NonNullable<ContactState["error"]>,
  string
> = {
  captcha: "Vérification reCAPTCHA invalide. Merci de réessayer.",
  fields:
    "Merci de renseigner un nom, une adresse e-mail valide et un message.",
  maxfiles: "Trop de pièces jointes : 5 fichiers maximum.",
  maxsize: "Une pièce jointe dépasse 5 Mo.",
  totalsize: "L’ensemble des pièces jointes dépasse 8 Mo.",
  type: "Type de fichier non autorisé : PDF, PNG, JPG uniquement.",
  rate: "Trop de tentatives rapprochées. Merci de patienter quelques minutes avant de réessayer.",
  mail: "Impossible de confirmer l’envoi du message pour le moment. Merci de réessayer plus tard ou de nous contacter par e-mail.",
  duplicate:
    "Cette référence a déjà été utilisée. Rechargez la page pour préparer une nouvelle demande.",
};
