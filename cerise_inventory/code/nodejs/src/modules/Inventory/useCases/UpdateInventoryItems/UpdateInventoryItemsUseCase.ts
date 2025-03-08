import { InventoryItems } from "@prisma/client";
import { IInventoryItemsRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryItemsRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

import Emission from "../../../../models/Emission";
import Scope from "../../../../models/Scope";
import { emissionFactors } from "../../../../utils/emissionFactors";
import { getPrisma } from "../../../../db/prisma";
import InventoryRepository from "../../../../modules/Inventory/repositories/InventoryRepository";
import GetInventoryUseCase from "../../../../modules/Inventory/useCases/GetInventory/GetInventoryUseCase";
import CategoryRepository from "../../../../modules/Inventory/repositories/CategoryRepository";
import GetCategoryUseCase from "../../../../modules/Inventory/useCases/GetCategory/GetCategoryUseCase";
import SourceRepository from "../../../../modules/Inventory/repositories/SourceRepository";
import GetSourcesUseCase from "../../../../modules/Inventory/useCases/GetSources/GetSourcesUseCase";

export default class UpdateInventoryItemsUseCase {
  private inventoryItemsRepository: IInventoryItemsRepository;

  constructor(inventoryItemsRepository: IInventoryItemsRepository) {
    this.inventoryItemsRepository = inventoryItemsRepository;
  }

  async execute(
    inventoryItemsId: string,
    updatedInventoryItemsData: Partial<InventoryItems>,
  ) {
    const prisma = await getPrisma();
    const existingItem =
      await this.inventoryItemsRepository.getById(inventoryItemsId);

    if (!existingItem) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Itens de inventário não encontrados.`,
        },
        404,
      );
    }

    try {
      if (
        !updatedInventoryItemsData.isActive &&
        updatedInventoryItemsData.deletedBy
      ) {
        return this.inventoryItemsRepository.update(
          inventoryItemsId,
          updatedInventoryItemsData,
        );
      }

      const inventoryItemId: string =
        updatedInventoryItemsData.id || existingItem.id;
      const scope: any = updatedInventoryItemsData.scope || existingItem.scope;
      const uf: string = updatedInventoryItemsData.uf || existingItem.uf;
      const description: string | null =
        updatedInventoryItemsData.description || existingItem.description;
      const categoryId: string =
        updatedInventoryItemsData.categoryId || existingItem.categoryId;
      const quantity: any =
        updatedInventoryItemsData.quantity || existingItem.quantity;
      const quantityJan: any =
        updatedInventoryItemsData.quantityJan || existingItem.quantityJan;
      const quantityFeb: any =
        updatedInventoryItemsData.quantityFeb || existingItem.quantityFeb;
      const quantityMar: any =
        updatedInventoryItemsData.quantityMar || existingItem.quantityMar;
      const quantityApr: any =
        updatedInventoryItemsData.quantityApr || existingItem.quantityApr;
      const quantityMay: any =
        updatedInventoryItemsData.quantityMay || existingItem.quantityMay;
      const quantityJun: any =
        updatedInventoryItemsData.quantityJun || existingItem.quantityJun;
      const quantityJul: any =
        updatedInventoryItemsData.quantityJul || existingItem.quantityJul;
      const quantityAug: any =
        updatedInventoryItemsData.quantityAug || existingItem.quantityAug;
      const quantitySep: any =
        updatedInventoryItemsData.quantitySep || existingItem.quantitySep;
      const quantityOct: any =
        updatedInventoryItemsData.quantityOct || existingItem.quantityOct;
      const quantityNov: any =
        updatedInventoryItemsData.quantityNov || existingItem.quantityNov;
      const quantityDec: any =
        updatedInventoryItemsData.quantityDec || existingItem.quantityDec;
      const inventoryId: string =
        updatedInventoryItemsData.inventoryId || existingItem.inventoryId;
      const sourceId: string =
        updatedInventoryItemsData.sourceId || existingItem.sourceId;
      const passenger: number =
        updatedInventoryItemsData.passenger || existingItem.passenger;
      const segment: number =
        updatedInventoryItemsData.segment || existingItem.segment;

      const inventoryRepository = new InventoryRepository(prisma);
      const categoryRepository = new CategoryRepository(prisma);
      const sourceRepository = new SourceRepository(prisma);

      const getInventoryUseCase = new GetInventoryUseCase(inventoryRepository);
      const getCategoryUseCase = new GetCategoryUseCase(categoryRepository);
      const getSourcesUseCase = new GetSourcesUseCase(sourceRepository);

      const inventory = await getInventoryUseCase.execute(inventoryId);
      const category = await getCategoryUseCase.execute(categoryId);
      const sources = await getSourcesUseCase.execute();

      const amount: any = [
        quantity,
        quantityJan,
        quantityFeb,
        quantityMar,
        quantityApr,
        quantityMay,
        quantityJun,
        quantityJul,
        quantityAug,
        quantitySep,
        quantityOct,
        quantityNov,
        quantityDec,
      ];

      const months: any = {
        1: "Janeiro",
        2: "Fevereiro",
        3: "Março",
        4: "Abril",
        5: "Maio",
        6: "Junho",
        7: "Julho",
        8: "Agosto",
        9: "Setembro",
        10: "Outubro",
        11: "Novembro",
        12: "Dezembro",
      };

      const activities = [
        "Energia",
        "Manufatura ou Construção",
        "Comercial ou Institucional",
        "Residencial, Agricultura, Florestal ou Pesca",
      ];

      const emittedGases = ["CO2", "CH4", "N2O"];

      // validate sources existence
      if (!inventory) {
        throw new Error("Nenhum inventário encontrado");
      }

      // validate sources existence
      if (!sources) {
        throw new Error("Nenhuma fonte encontrada");
      }
      const source = sources.find((source) => source.id === sourceId);

      // validate category and source
      if (!category || !source) {
        throw new Error("Categoria e fonte devem ser válidas");
      }

      if (category && category.name === "Emissões Fugitivas") {
        const scopeObject: any = new Scope(
          category.name,
          source.name,
          [new Emission("HFCs", 1, emissionFactors["GWPF"][source.name], 1000)],
          source.measurementUnit,
        );

        const calculatedFossilEmissions: any = await scopeObject[scope](amount);
        const total_CO2eA = [
          Number(
            Object.values(calculatedFossilEmissions).reduce(
              (sum: any, emission: any) => sum + emission[1],
              0,
            ),
          ),
          0,
        ];

        return this.inventoryItemsRepository.update(inventoryItemsId, {
          uf,
          description,
          categoryId,
          sourceId,
          quantity,
          quantityJan,
          quantityFeb,
          quantityMar,
          quantityApr,
          quantityMay,
          quantityJun,
          quantityJul,
          quantityAug,
          quantitySep,
          quantityOct,
          quantityNov,
          quantityDec,
          passenger,
          segment,
          emissions: JSON.stringify({
            calculatedFossilEmissions,
            calculatedBiogenicEmissions: 0,
          }),
          total_CO2e: JSON.stringify(total_CO2eA) ?? "[0, 0]",
        });
      } else if (source && source.name === "Gasolina Automotiva (comercial)") {
        var fossilSource: any = sources.find(
          (source) => source.name === "Gasolina Automotiva (pura)",
        );
        var fossilQuantity: any = JSON.parse(JSON.stringify(amount));
        fossilQuantity[0] = fossilQuantity[0] * (1 - emissionFactors["BFPG"]);

        var biogenicSource: any = sources.find(
          (source) => source.name === "Etanol Anidro",
        );
        var biogenicQuantity: any = JSON.parse(JSON.stringify(amount));
        biogenicQuantity[0] = biogenicQuantity[0] * emissionFactors["BFPG"];

        const emissionsObjectFossil = emittedGases.map((gas) => {
          if (
            emissionFactors[category.name][fossilSource.name][gas][
              activities[2]
            ]
          ) {
            return new Emission(
              gas,
              emissionFactors[category.name][fossilSource.name][gas][
                activities[2]
              ],
              emissionFactors["GWPF"][gas],
              1000,
            );
          } else {
            return new Emission(
              gas,
              emissionFactors[category.name][fossilSource.name][gas],
              emissionFactors["GWPF"][gas],
              1000,
            );
          }
        });

        const emissionsObjectBiogenic = emittedGases.map((gas) => {
          if (
            emissionFactors[category.name][biogenicSource.name][gas][
              activities[2]
            ]
          ) {
            return new Emission(
              gas,
              emissionFactors[category.name][biogenicSource.name][gas][
                activities[2]
              ],
              emissionFactors["GWPF"][gas],
              1000,
            );
          } else {
            return new Emission(
              gas,
              emissionFactors[category.name][biogenicSource.name][gas],
              emissionFactors["GWPF"][gas],
              1000,
            );
          }
        });

        const scopeObjectFossil: any = new Scope(
          categoryId,
          sourceId,
          emissionsObjectFossil,
          source.measurementUnit,
        );

        const scopeObjectBiogenic: any = new Scope(
          categoryId,
          sourceId,
          emissionsObjectBiogenic,
          source.measurementUnit,
        );

        const calculatedFossilEmissions: any =
          await scopeObjectFossil[scope](fossilQuantity);
        const calculatedBiogenicEmissions: any =
          await scopeObjectBiogenic[scope](biogenicQuantity);

        const total_CO2eA = [
          Number(
            Object.values(calculatedFossilEmissions).reduce(
              (sum: any, emission: any) => sum + emission[1],
              0,
            ),
          ) +
            Number(calculatedBiogenicEmissions["CH4"][1]) +
            Number(calculatedBiogenicEmissions["N2O"][1]),
          calculatedBiogenicEmissions["CO2"][1],
        ];

        return this.inventoryItemsRepository.update(inventoryItemsId, {
          uf,
          description,
          categoryId,
          sourceId,
          quantity,
          quantityJan,
          quantityFeb,
          quantityMar,
          quantityApr,
          quantityMay,
          quantityJun,
          quantityJul,
          quantityAug,
          quantitySep,
          quantityOct,
          quantityNov,
          quantityDec,
          passenger,
          segment,
          emissions: JSON.stringify({
            calculatedFossilEmissions,
            calculatedBiogenicEmissions,
          }),
          total_CO2e: JSON.stringify(total_CO2eA),
        });
      } else if (source && source.name === "Óleo Diesel (comercial)") {
        var fossilSource: any = sources.find(
          (source) => source.name === "Óleo Diesel (puro)",
        );
        var fossilQuantity: any = JSON.parse(JSON.stringify(amount));
        fossilQuantity[0] =
          fossilQuantity[0] *
          (1 - emissionFactors["BFPD"][inventory.year]["Anual"]);

        var biogenicSource: any = sources.find(
          (source) => source.name === "Biodiesel (B100)",
        );
        var biogenicQuantity: any = JSON.parse(JSON.stringify(amount));
        biogenicQuantity[0] =
          biogenicQuantity[0] *
          emissionFactors["BFPD"][inventory.year]["Anual"];

        const emissionsObjectFossil = emittedGases.map((gas) => {
          if (
            emissionFactors[category.name][fossilSource.name][gas][
              activities[2]
            ]
          ) {
            return new Emission(
              gas,
              emissionFactors[category.name][fossilSource.name][gas][
                activities[2]
              ],
              emissionFactors["GWPF"][gas],
              1000,
            );
          } else {
            return new Emission(
              gas,
              emissionFactors[category.name][fossilSource.name][gas],
              emissionFactors["GWPF"][gas],
              1000,
            );
          }
        });

        const emissionsObjectBiogenic = emittedGases.map((gas) => {
          if (
            emissionFactors[category.name][biogenicSource.name][gas][
              activities[2]
            ]
          ) {
            return new Emission(
              gas,
              emissionFactors[category.name][biogenicSource.name][gas][
                activities[2]
              ],
              emissionFactors["GWPF"][gas],
              1000,
            );
          } else {
            return new Emission(
              gas,
              emissionFactors[category.name][biogenicSource.name][gas],
              emissionFactors["GWPF"][gas],
              1000,
            );
          }
        });

        const scopeObjectFossil: any = new Scope(
          categoryId,
          sourceId,
          emissionsObjectFossil,
          source.measurementUnit,
        );

        const scopeObjectBiogenic: any = new Scope(
          categoryId,
          sourceId,
          emissionsObjectBiogenic,
          source.measurementUnit,
        );

        const calculatedFossilEmissions: any =
          await scopeObjectFossil[scope](fossilQuantity);
        const calculatedBiogenicEmissions: any =
          await scopeObjectBiogenic[scope](biogenicQuantity);

        const total_CO2eA = [
          Number(
            Object.values(calculatedFossilEmissions).reduce(
              (sum: any, emission: any) => sum + emission[1],
              0,
            ),
          ) +
            Number(calculatedBiogenicEmissions["CH4"][1]) +
            Number(calculatedBiogenicEmissions["N2O"][1]),
          calculatedBiogenicEmissions["CO2"][1],
        ];

        return this.inventoryItemsRepository.update(inventoryItemsId, {
          uf,
          description,
          categoryId,
          sourceId,
          quantity,
          quantityJan,
          quantityFeb,
          quantityMar,
          quantityApr,
          quantityMay,
          quantityJun,
          quantityJul,
          quantityAug,
          quantitySep,
          quantityOct,
          quantityNov,
          quantityDec,
          passenger,
          segment,
          emissions: JSON.stringify({
            calculatedFossilEmissions,
            calculatedBiogenicEmissions,
          }),
          total_CO2e: JSON.stringify(total_CO2eA),
        });
      } else if (source && source.name.includes("Aeronaves")) {
        let scopeObject: any;

        if (quantity <= 500) {
          scopeObject = new Scope(
            "Viagens a Negócios",
            "Curta distância (d ≤ 500 km)",
            emittedGases.map(function (gas) {
              return new Emission(
                gas,
                emissionFactors["Viagens a Negócios"][
                  "Curta distância (d ≤ 500 km)"
                ][gas],
                emissionFactors["GWPF"][gas],
                1000,
              );
            }),
            "km",
          );
        } else if (quantity > 500 && quantity <= 3700) {
          scopeObject = new Scope(
            "Viagens a Negócios",
            "Média distância (500 < d ≤ 3.700 km)",
            emittedGases.map(function (gas) {
              return new Emission(
                gas,
                emissionFactors["Viagens a Negócios"][
                  "Média distância (500 < d ≤ 3.700 km)"
                ][gas],
                emissionFactors["GWPF"][gas],
                1000,
              );
            }),
            "km",
          );
        } else if (quantity > 3700) {
          scopeObject = new Scope(
            "Viagens a Negócios",
            "Longa distância (d > 3.700 km)",
            emittedGases.map(function (gas) {
              return new Emission(
                gas,
                emissionFactors["Viagens a Negócios"][
                  "Longa distância (d > 3.700 km)"
                ][gas],
                emissionFactors["GWPF"][gas],
                1000,
              );
            }),
            "km",
          );
        }

        console.log(scopeObject);

        const calculatedFossilEmissions: any = await scopeObject[scope]([
          passenger * segment * amount[0],
          ...amount,
        ]);
        const total_CO2eA = [
          Number(
            Object.values(calculatedFossilEmissions).reduce(
              (sum: any, emission: any) => sum + emission[1],
              0,
            ),
          ),
          0,
        ];

        return this.inventoryItemsRepository.update(inventoryItemsId, {
          uf,
          description,
          categoryId,
          sourceId,
          quantity,
          quantityJan,
          quantityFeb,
          quantityMar,
          quantityApr,
          quantityMay,
          quantityJun,
          quantityJul,
          quantityAug,
          quantitySep,
          quantityOct,
          quantityNov,
          quantityDec,
          passenger,
          segment,
          emissions: JSON.stringify({
            calculatedFossilEmissions,
            calculatedBiogenicEmissions: 0,
          }),
          total_CO2e: JSON.stringify(total_CO2eA) ?? "[0, 0]",
        });
      } else {
        var emissionsObject: any = [];

        if (category && category.name === "SIN") {
          emissionsObject = amount.map((_: any, index: any) => {
            if (index === 0) return null;
            const month = months[index];
            return new Emission(
              "CO2",
              emissionFactors[category.name][source.name][inventory.year][
                month
              ],
              1,
              1,
            );
          });
        } else if (category && category.name === "SIA") {
          emissionsObject = amount.map((item: any, index: any) => {
            if (index === 0) return null;
            const month = months[index];
            return new Emission(
              "CO2",
              emissionFactors[category.name][source.name][inventory.year][
                month
              ],
              1,
              1,
            );
          });
        } else {
          emissionsObject = emittedGases.map((gas) => {
            if (
              emissionFactors[category.name][source.name][gas][activities[2]]
            ) {
              return new Emission(
                gas,
                emissionFactors[category.name][source.name][gas][activities[2]],
                emissionFactors["GWPF"][gas],
                1000,
              );
            } else {
              return new Emission(
                gas,
                emissionFactors[category.name][source.name][gas],
                emissionFactors["GWPF"][gas],
                1000,
              );
            }
          });
        }

        const scopeObject: any = new Scope(
          categoryId,
          sourceId,
          emissionsObject,
          source.measurementUnit,
        );

        var calculatedFossilEmissions: any = {};
        var calculatedBiogenicEmissions: any = {};
        var total_CO2eA: any = [];
        if (emissionFactors[category.name][source.name]["type"] === "fossil") {
          calculatedFossilEmissions = await scopeObject[scope](amount);
          total_CO2eA = [
            Object.values(calculatedFossilEmissions).reduce(
              (sum: any, emission: any) => sum + emission[1],
              0,
            ),
            0,
          ];
        } else if (
          emissionFactors[category.name][source.name]["type"] === "biogenic"
        ) {
          calculatedBiogenicEmissions = await scopeObject[scope](amount);
          total_CO2eA = [
            calculatedBiogenicEmissions["CH4"][1] +
              calculatedBiogenicEmissions["N2O"][1],
            calculatedBiogenicEmissions["CO2"][1],
          ];
        } else if (source.name === "Eletricidade Comprada") {
          calculatedFossilEmissions = await scopeObject[scope](amount);
          total_CO2eA = [
            Object.values(calculatedFossilEmissions).reduce(
              (sum: any, emission: any) => sum + emission[1],
              0,
            ),
            0,
          ];
        }

        return this.inventoryItemsRepository.update(inventoryItemsId, {
          uf,
          description,
          categoryId,
          sourceId,
          quantity,
          quantityJan,
          quantityFeb,
          quantityMar,
          quantityApr,
          quantityMay,
          quantityJun,
          quantityJul,
          quantityAug,
          quantitySep,
          quantityOct,
          quantityNov,
          quantityDec,
          passenger,
          segment,
          emissions: JSON.stringify({
            calculatedFossilEmissions,
            calculatedBiogenicEmissions,
          }),
          total_CO2e: JSON.stringify(total_CO2eA),
        });
      }
    } catch (err) {
      const calculatedEmissions = JSON.stringify({
        calculatedFossilEmissions: {},
        calculatedBiogenicEmissions: {},
      });
      const total_CO2eA = JSON.stringify([0, 0]);

      console.error(err);

      return this.inventoryItemsRepository.update(inventoryItemsId, {
        ...updatedInventoryItemsData,
        emissions: calculatedEmissions,
        total_CO2e: total_CO2eA,
      });
    }
  }
}
