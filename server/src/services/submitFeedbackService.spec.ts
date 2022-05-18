import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy},
)

describe("Submit feedback", ()=>{
  it("should be able to submit a feedback", async ()=>{


   await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: "Muito foda",
      screenshot: "data:image/png;base64,KKKKKKKKKKKKKKBurlado",
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without comment", async ()=>{

   await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: "",
      screenshot: "data:image/png;base64,KKKKKKKKKKKKKKBurlado",
    })).rejects.toThrow();
  });

  it("should not be able to submit feedback without type", async ()=>{

    await expect(submitFeedback.execute({
       type: '',
       comment: "AAAAAA",
       screenshot: "data:image/png;base64,KKKKKKKKKKKKKKBurlado",
     })).rejects.toThrow();
   });

   it("should not be able to submit feedback with an invalid screenshot", async ()=>{

    await expect(submitFeedback.execute({
       type: 'IDEA',
       comment: "AAAAAAAAAA",
       screenshot: "bolado.jpg",
     })).rejects.toThrow();
   });
});

