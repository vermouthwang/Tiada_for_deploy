import { pipeline } from '@xenova/transformers';
const synthesizer = await pipeline('text-to-speech', 'ylacombe/mms-guj-finetuned-monospeaker', {
    quantized: false, // Remove this line to use the quantized version (default)
});
class MyTranslationPipeline {
  static task = 'text-to-speech';
  static model = 'Xenova/speecht5_tts';
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { quantized: false });
    }

    return this.instance;
  }
}
self.addEventListener('message', async (event) => {
    // Retrieve the translation pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let translator = await MyTranslationPipeline.getInstance(x => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        self.postMessage(x);
    });
  
    // Actually perform the translation
    const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
    let output = await translator('hello, world', {speaker_embeddings});
    console.log(output);
    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: output,
    });
  });