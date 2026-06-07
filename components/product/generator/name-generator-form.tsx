"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useT } from "@/components/home/i18n";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCredits } from "@/hooks/use-credits";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

const formSchema = z.object({
  englishName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  birthYear: z.string().optional(),
  personalityTraits: z.string().optional(),
  namePreferences: z.string().optional(),
  planType: z.enum(["1", "4"], {
    required_error: "Please select a plan type.",
  }),
});

interface NameGeneratorFormProps {
  onGenerate: (data: z.infer<typeof formSchema>) => Promise<void>;
  isGenerating: boolean;
  hasTriedFree?: boolean;
  savedFormData?: any;
}

export default function NameGeneratorForm({
  onGenerate,
  isGenerating,
  hasTriedFree = false,
  savedFormData,
}: NameGeneratorFormProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const { credits: userCredits, loading: creditsLoading } = useCredits();
  const t = useT("chineseName").generator;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      englishName: "",
      gender: "male",
      birthYear: "",
      personalityTraits: "",
      namePreferences: "",
      planType: "1",
    },
  });

  // Load saved form data when component mounts or savedFormData changes
  useEffect(() => {
    if (savedFormData) {
      console.log("Loading saved form data:", savedFormData);
      form.reset({
        englishName: savedFormData.englishName || "",
        gender: savedFormData.gender || "male",
        birthYear: savedFormData.birthYear || "",
        personalityTraits: savedFormData.personalityTraits || "",
        namePreferences: savedFormData.namePreferences || "",
        planType: "1", // Always default to standard
      });

      toast({
        title: t.welcomeBack,
        description: t.welcomeBackDesc,
      });
    }
  }, [savedFormData, form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await onGenerate(values);
    } catch (error) {
      toast({
        title: t.genFailed,
        description: t.genFailedDesc,
      });
    }
  }

  const handlePremiumFeatureClick = () => {
    if (!user) {
      toast({
        title: t.premiumFeature,
        description: t.premiumFeatureDesc,
      });
    }
  };

  // Check if user has enough credits
  const creditCost = parseInt(form.watch("planType") || "1");
  const currentCredits = userCredits?.remaining_credits || 0;
  const hasEnoughCredits = user ? currentCredits >= creditCost : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="shadow-lg border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t.cardTitle}</CardTitle>
          <CardDescription>{t.cardDescription}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Your Name Field */}
            <div className="space-y-2">
              <Label htmlFor="englishName" className="text-base font-medium">
                {t.yourName} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="englishName"
                placeholder={t.enterName}
                className="h-12 text-base"
                {...form.register("englishName")}
              />
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                {user ? (
                  <>
                    <span>
                      {t.credits}:{" "}
                      {creditsLoading ? "Loading..." : currentCredits}
                    </span>
                    <span className="text-primary">|</span>
                    <span>{t.ready}</span>
                  </>
                ) : (
                  <>
                    <span>{t.freeTrialAvailable}</span>
                    <span className="text-primary">{t.noRegistration}</span>
                  </>
                )}
              </div>
              {form.formState.errors.englishName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.englishName.message}
                </p>
              )}
            </div>

            {/* Gender Field */}
            <div className="space-y-2">
              <Label className="text-base font-medium">{t.gender}</Label>
              <Select
                onValueChange={(value) =>
                  form.setValue("gender", value as "male" | "female" | "other")
                }
                defaultValue={form.getValues("gender")}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t.selectGender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t.male}</SelectItem>
                  <SelectItem value="female">{t.female}</SelectItem>
                  <SelectItem value="other">{t.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Birth Year Field */}
            <div className="space-y-2">
              <Label htmlFor="birthYear" className="text-base font-medium">
                {t.birthYear}
              </Label>
              <Input
                id="birthYear"
                type="number"
                placeholder="1990"
                className="h-12"
                {...form.register("birthYear")}
              />
            </div>

            {/* Personality Traits Field */}
            <div className="space-y-2">
              <Label
                htmlFor="personalityTraits"
                className="text-base font-medium flex items-center justify-between"
              >
                <span>{t.personalityTraits}</span>
                {!user && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    {t.premium}
                  </span>
                )}
              </Label>
              <Textarea
                id="personalityTraits"
                placeholder={t.personalityPlaceholder}
                className="min-h-[100px]"
                onClick={!user ? handlePremiumFeatureClick : undefined}
                readOnly={!user}
                {...form.register("personalityTraits")}
              />
            </div>

            {/* Name Preferences Field */}
            <div className="space-y-2">
              <Label
                htmlFor="namePreferences"
                className="text-base font-medium flex items-center justify-between"
              >
                <span>{t.namePreferences}</span>
                {!user && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    {t.premium}
                  </span>
                )}
              </Label>
              <Textarea
                id="namePreferences"
                placeholder={t.namePreferencesPlaceholder}
                className="min-h-[100px]"
                onClick={!user ? handlePremiumFeatureClick : undefined}
                readOnly={!user}
                {...form.register("namePreferences")}
              />
            </div>

            {/* Plan Type Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                {t.generationType}
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  form.setValue("planType", value as "1" | "4")
                }
                defaultValue={form.getValues("planType")}
                className="grid grid-cols-1 gap-2"
              >
                <div className="flex items-center space-x-2 px-4 py-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <RadioGroupItem value="1" id="standard" />
                  <Label
                    htmlFor="standard"
                    className="font-medium cursor-pointer flex-grow"
                  >
                    {t.standard}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-4 py-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <RadioGroupItem value="4" id="premium" />
                  <Label
                    htmlFor="premium"
                    className="font-medium cursor-pointer flex-grow"
                  >
                    {t.premiumPlan}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isGenerating || Boolean(user && hasEnoughCredits === false)
              }
              className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t.generating}
                </div>
              ) : user ? (
                hasEnoughCredits ? (
                  <>
                    {t.generate}
                    <span className="ml-2 text-base opacity-80">
                      ({creditCost} Credits)
                    </span>
                  </>
                ) : (
                  t.insufficientCredits
                )
              ) : hasTriedFree ? (
                t.signUp
              ) : (
                <>
                  {t.freeTrial}
                  <span className="ml-2 text-base opacity-80">
                    ({t.noLogin})
                  </span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
