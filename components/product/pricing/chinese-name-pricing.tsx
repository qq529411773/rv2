"use client";

import { useT } from "@/components/home/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { motion } from "framer-motion";
import { Check, Crown, Gift, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline";
}

interface ChineseNamePricingProps {
  onScrollToForm?: () => void;
}

export default function ChineseNamePricing({
  onScrollToForm,
}: ChineseNamePricingProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const t = useT("chineseName").pricing;

  const pricingTiers: PricingTier[] = [
    {
      id: "free-trial",
      name: t.freeTrial,
      price: "$0",
      credits: 1,
      description: t.freeTrialDesc,
      features: t.freeFeatures,
      icon: <Gift className="h-6 w-6" />,
      buttonText: t.tryFree,
      buttonVariant: "outline",
    },
    {
      id: "credit-pack",
      name: t.creditPack,
      price: "$5",
      credits: 1000,
      description: t.creditPackDesc,
      features: t.creditFeatures,
      icon: <Crown className="h-6 w-6" />,
      popular: true,
      buttonText: t.purchaseCredits,
      buttonVariant: "default",
    },
  ];

  const handlePurchase = async (tierId: string) => {
    if (tierId === "free-trial") {
      if (onScrollToForm) {
        onScrollToForm();
      } else {
        const formSection = document.querySelector(
          "[data-name-generator-form]",
        );
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    if (!user) {
      toast({
        title: t.signInRequired,
        description: t.signInRequiredDesc,
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    setIsProcessing(tierId);

    try {
      const response = await fetch("/api/creem/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productType: "chinese-name-credits",
          quantity: 1000,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { checkoutUrl } = await response.json();

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: t.paymentFailed,
        description: t.paymentFailedDesc,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <section
      id="chinese-name-pricing"
      className="w-full py-20 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t.title}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {t.mostPopular}
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full transition-all duration-300 hover:shadow-lg ${
                    tier.popular
                      ? "border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
                      : "border border-border hover:border-primary/20"
                  }`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={`p-3 rounded-full ${
                          tier.popular ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <div
                          className={
                            tier.popular
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        >
                          {tier.icon}
                        </div>
                      </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-foreground">
                      {tier.name}
                    </CardTitle>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-foreground">
                          {tier.price}
                        </span>
                        {tier.id !== "free-trial" && (
                          <span className="text-muted-foreground text-lg">
                            / {tier.credits} credits
                          </span>
                        )}
                      </div>

                      <p className="text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features List */}
                    <div className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`mt-0.5 p-1 rounded-full ${
                              tier.popular ? "bg-primary/10" : "bg-muted"
                            }`}
                          >
                            <Check
                              className={`h-3 w-3 ${
                                tier.popular
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <span className="text-muted-foreground text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Purchase Button */}
                    <div className="pt-4">
                      <Button
                        onClick={() => handlePurchase(tier.id)}
                        disabled={isProcessing === tier.id}
                        variant={tier.buttonVariant}
                        className={`w-full h-12 text-lg font-medium transition-all duration-200 ${
                          tier.popular
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "border-primary/20 text-primary hover:bg-primary/5"
                        }`}
                      >
                        {isProcessing === tier.id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            {t.processing}
                          </div>
                        ) : (
                          tier.buttonText
                        )}
                      </Button>
                    </div>

                    {/* Value Proposition */}
                    {tier.id === "credit-pack" && (
                      <div className="text-center pt-2">
                        <p className="text-sm text-muted-foreground">
                          {t.perCredit}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ or Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center space-y-4 pt-8"
          >
            <h3 className="text-xl font-semibold text-foreground">
              {t.questions}
            </h3>
            <p className="text-muted-foreground">{t.creditsDesc}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                {t.securePayments}
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                {t.instantDelivery}
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                {t.support}
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                {t.moneyBack}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
