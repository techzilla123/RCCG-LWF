import { useState } from "react";
import { FormHeader } from "./FormHeader";
import { InputField } from "./InputField";
import { URLInput } from "./URLInput";
import { KeywordTags } from "./KeywordTags";
import { MediaUpload } from "./MediaUpload";
import { FormActions } from "./FormActions";
import { CloseButton } from "./CloseButton";
import CustomerOptionsForm from "../ProductsAddTwo/CustomerOptionsForm";
import PricingForm from "../PricingForm/PricingForm";
import PreviewNew from "../PreviewSave/PreviewNew";

// Defining the type for the component props
type ProductDetailFormProps = {
  onClose: () => void;
};

export const ProductDetailForm = ({ onClose }: ProductDetailFormProps) => {
  const [step, setStep] = useState(1);

  // Functions for handling step navigation
  const handleClose = () => {
    onClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);


  // Step 1 content
  if (step === 1) {
    return (
      <main className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
        <FormHeader
          step={step}
          totalSteps={4}
          title="Product detail"
          subtitle="Add product"
        />

        <section className="flex flex-col gap-4 max-md:gap-3 max-sm:gap-2.5">
          <InputField
            label="Product name"
            required
            value="All-In-One Happy Birthday Bash Décor Kit"
          />
          <InputField
            label="Description"
            required
            value="All-In-One Happy Birthday Bash Décor Kit"
            multiline
          />
          <InputField label="Producer" value="Savic birthday" />
          <URLInput />
          <InputField label="Category" required value="Birthday shop" />
          <InputField label="Sub category" required value="Sub category" />

          {/* Use the KeywordTags component directly */}
          <KeywordTags />

          <MediaUpload files={uploadedFiles} onFilesChange={setUploadedFiles} />
        </section>

        <FormActions
          onCancel={handleCancel}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={false}
        />

        <CloseButton onClick={handleClose} />
      </main>
    );
  }

  // Step 2: Customer Options Form
  if (step === 2) {
    return (
      <>
        <CustomerOptionsForm
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={handleCancel}
          onClose={handleClose}
        />
        <CloseButton onClick={handleClose} />
      </>
    );
  }

  // Step 3: Show Pricing Form Modal
  if (step === 3) {
    return (
      <>
        <PricingForm
          onCancel={handleCancel}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
        <CloseButton onClick={handleClose} />
      </>
    );
  }

  if (step === 4) {
    return (
      <>
        <PreviewNew
          onCancel={handleCancel}  // Pass handleCancel function here
          onPrevious={handlePrevious}  // Pass handlePrevious function here
        />
        <CloseButton onClick={handleClose} />
      </>
    );
  }

  return null;
};

export default ProductDetailForm;
