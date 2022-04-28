export default function Preview() {
  return (
    <div className="h-screen w-screen relative flex content-center justify-center">
      <img
        className="h-full bg-fixed w-screen object-fill bg-[length:100%_auto] absolute top-0 left-0 z-0"
        src="/images/preview-image.jpg"
        alt="preview-background"
      />
      <section className="absolute text-white top-2 left-2 md:top-4 md:left-4 sm:text-lg lg:text-xl">
        Go back
      </section>
      <section className="m-auto w-5/6 lg:w-4/6 max-h-[33rem] lg:max-h-[37rem] overflow-x-hidden overflow-y-auto bg-white bg-opacity-25 border border-opacity-25 border-white z-30 text-white font-modern-sans rounded md:rounded-md lg:rounded-lg shadow-preview backdrop-blur-sm">
        <div className="text-white text-opacity-100 opacity-100 py-3 px-2 md:px-3 md:py-4 lg:py-4 lg:px-4">
          Hello World! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quidem eius enim, error tempora aliquid quibusdam. Impedit laborum
          voluptatum sed itaque consequatur nulla atque aperiam qui ducimus
          ratione unde, incidunt quia. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo rerum doloribus nihil totam perspiciatis
          distinctio maxime aut magnam ipsum, quaerat harum delectus voluptate
          nulla placeat praesentium facilis in ipsa quae. Incidunt odit tempora
          consequuntur voluptate eveniet doloremque perspiciatis impedit non
          tenetur a beatae qui quibusdam animi veniam fugiat maxime quia
          obcaecati enim eius nihil unde exercitationem, quos repellat. Odit,
          distinctio! At iusto ullam, ad minima recusandae illum ipsa, accusamus
          quidem quos odit cumque, facere doloribus pariatur. Vero, aliquam,
          labore quasi totam impedit optio, minus et necessitatibus laborum
          nulla ex ipsa?
        </div>
      </section>
    </div>
  );
}
