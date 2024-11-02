import { useRequest } from "alova/client";
import React, { Fragment, useEffect } from "react";
import { alovaInstance } from "../../api";
import { Release, ReleaseAsset } from "../../types";
import { useReactive } from "ahooks";
import { last } from "radash";
import Link from "../Link";

type Platform = "Windows" | "MacOS" | "Linux";

interface State {
  list: Array<{
    platform: Platform;
    assets: ReleaseAsset[];
  }>;
}

function Download() {
  const { data } = useRequest(alovaInstance.Get<Release>("/latest"));
  const state = useReactive<State>({
    list: [],
  });

  useEffect(() => {
    if (!data) return;

    state.list = [];

    let platforms: Platform[] = ["Windows", "MacOS", "Linux"];

    const platform = getPlatform();

    if (platform && platforms.includes(platform)) {
      platforms = [...new Set([platform, ...platforms])];
    }

    for (const platform of platforms) {
      state.list.push({ platform, assets: [] });
    }

    for (const asset of data.assets) {
      let platform: Platform;

      if (asset.name.endsWith(".exe")) {
        platform = "Windows";
      } else if (asset.name.endsWith(".dmg")) {
        platform = "MacOS";
      } else {
        platform = "Linux";
      }

      const findItem = state.list.find((item) => item.platform === platform);

      findItem?.assets.push(asset);
    }
  }, [data]);

  const getPlatform = (): Platform | undefined => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("win")) {
      return "Windows";
    }

    if (userAgent.includes("mac")) {
      return "MacOS";
    }

    if (userAgent.includes("linux")) {
      return "Linux";
    }
  };

  const getArch = (platform: Platform, assetName: string) => {
    if (platform === "Windows") {
      return last(assetName.split("_"))?.split("-")[0];
    }

    if (platform === "MacOS") {
      return last(assetName.split("_"))?.split(".")[0];
    }

    return last(assetName.split("."));
  };

  return (
    <div className="bg-slate-100 min-h-[calc(100vh-var(--rp-nav-height))] dark:bg-neutral-950">
      <div className="bg-[var(--rp-container-tip-bg)] text-center w-full p-3">
        <div className="font-bold text-[var(--rp-container-tip-text)] mb-2">
          最新稳定版本：{data?.name}
        </div>
        <div>
          不确定下载哪个？请查看
          <Link href="/guide/install">安装指南</Link>
        </div>
      </div>

      <div className="flex flex-col p-12 gap-12 items-center">
        {state.list.map((item) => {
          const { platform, assets } = item;

          return (
            <Fragment key={platform}>
              <div className="flex gap-2 items-center">
                <svg className="fill-current size-8" aria-hidden="true">
                  <use xlinkHref={`#icon-${platform}`}></use>
                </svg>

                <div className="font-bold leading-none text-4xl">
                  {platform}
                </div>
              </div>

              <ul className="flex flex-wrap gap-y-12 gap-x-24 justify-center">
                {assets.map((item) => {
                  const { name, browser_download_url } = item;

                  return (
                    <li
                      key={name}
                      className="bg-white cursor-pointer rounded-3xl h-48 shadow-md w-44 relative group dark:bg-neutral-900"
                      onClick={() => {
                        location.href = browser_download_url;
                      }}
                    >
                      <div className="flex flex-col transition-all gap-6 size-full justify-center items-center group-hover:opacity-0 group-hover:scale-50">
                        <svg
                          className="fill-current size-16"
                          aria-hidden="true"
                        >
                          <use xlinkHref={`#icon-${platform}`}></use>
                        </svg>

                        <div className="font-medium text-4">
                          {getArch(platform, name)}
                        </div>
                      </div>

                      <div className="flex flex-col opacity-0 inset-0 transition-all gap-6 scale-50 absolute size-full justify-center items-center group-hover:opacity-100 group-hover:scale-100">
                        <svg className="fill-[url(#icon-gradient)] size-16">
                          <defs>
                            <linearGradient
                              id="icon-gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="var(--rp-c-brand-dark)"
                                stopOpacity="1"
                              />
                              <stop
                                offset="100%"
                                stopColor="var(--rp-c-brand-light)"
                                stopOpacity="1"
                              />
                            </linearGradient>
                          </defs>
                          <use xlinkHref={`#icon-download`}></use>
                        </svg>

                        <span className="font-medium">点击下载</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Download;
