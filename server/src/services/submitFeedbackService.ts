import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackServiceRequest{
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
   private feedbacksRepository: FeedbacksRepository,
   private mailAdapter: MailAdapter,
  ){}

  async execute(request: SubmitFeedbackServiceRequest){
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error("Tá faltando um tipo ai meu bom")
    }

    if(!comment){
      throw new Error("Feedback sem comentario não da né meu patrão!")
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error("Foto invalida amigão...")
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        `</div>`,
      ].join("\n")
    })
  }
}