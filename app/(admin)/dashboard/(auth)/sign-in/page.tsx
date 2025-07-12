import FormSignIn from "./_components/form";


export default function SignInPage() {
  return (
    <main className="w-full h-screen overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">  
        <FormSignIn />
      </div>
    </main>
  );
}
