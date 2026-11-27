// Originalne fotografije sa @gold_ada_exclusive_. Statički import daje dimenzije i blur placeholder.
import hero from "@/assets/images/hero.jpg";
import sala from "@/assets/images/sala.jpg";
import kompleks from "@/assets/images/kompleks.jpg";
import basta from "@/assets/images/basta.jpg";
import sto from "@/assets/images/sto.jpg";
import dekoracija from "@/assets/images/dekoracija.jpg";
import kocija from "@/assets/images/kocija.jpg";
import salaDetalj from "@/assets/images/sala-detalj.jpg";
import mladenackiSto from "@/assets/images/mladenacki-sto.jpg";
import prviPles from "@/assets/images/prvi-ples.jpg";
import dronPoster from "@/assets/images/dron-poster.jpg";

export const img = { hero, sala, kompleks, basta, sto, dekoracija, kocija, salaDetalj, mladenackiSto, prviPles, dronPoster };

export type ImageKey = keyof typeof img;
